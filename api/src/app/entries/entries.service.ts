import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { exceptions } from 'src/config/exceptions';
import { GetEntriesDto } from 'src/app/entries/dtos/get-entries.dto';
import { GetWordDto } from 'src/app/entries/dtos/get-word.dto';
import { AppException } from 'src/helpers/exception';
import { PrismaService } from 'src/providers/database/prisma.service';
import { FavoriteDto } from './dtos/favorite-dto';
import { UnfavoriteDto } from './dtos/unfavorite-dto';

@Injectable()
export class EntriesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
  ) {}

  async get(params: GetEntriesDto) {
    const { search, limit, cursor } = params;
    const where = search ? { word: { contains: search } } : {};
    const take = Number(limit) || 10;

    const findManyArgs: any = {
      where,
      take: take + 1,
      select: {
        word: true,
      },
    };

    if (cursor) {
      findManyArgs.cursor = { id: cursor };
      findManyArgs.skip = 1;
    }

    const entries = await this.prisma.word.findMany({
      ...findManyArgs,
      select: {
        id: true,
        word: true,
      },
    });

    const hasPrevious = cursor ? entries[0].id : null;
    const hasNext = entries.length > take;
    const items = entries.slice(0, take);

    return {
      results: items.map((entry) => entry.word),
      previous: cursor ? items[0].id : null,
      next: hasNext ? items[items.length - 1].id : null,
      hasNext,
      hasPrevious,
    };
  }

  async word(params: GetWordDto) {
    const word = await this.prisma.word.findFirst({
      where: { word: params.word },
    });

    if (!word) {
      throw new AppException(exceptions.wordNotFound.friendlyMessage);
    }

    const favorite = await this.prisma.favorite.findFirst({
      where: { wordId: word.id, userId: params.loggedUser?.id },
    });

    const userId = params.loggedUser?.id;
    const wordId = word.id;

    if (!userId) {
      throw new AppException(exceptions.historyInvalidUserId.friendlyMessage);
    }

    if (!wordId) {
      throw new AppException(exceptions.historyInvalidWordId.friendlyMessage);
    }

    this.createOrUpdateHistory(wordId, userId);

    const response = await this.httpService.axiosRef.get(params.word);

    if (response.status === 404) {
      throw new AppException(exceptions.wordBadRequest.friendlyMessage);
    }

    return {
      dictionary: response.data,
      favorited: !!favorite,
    };
  }

  async favorite(params: FavoriteDto) {
    const word = await this.prisma.word.findFirst({
      where: { word: params.word },
    });

    if (!word) {
      throw new AppException(exceptions.wordNotFound.friendlyMessage);
    }

    const userId = params.loggedUser?.id;
    if (!userId) {
      throw new AppException(exceptions.userInvalidUserId.friendlyMessage);
    }

    const favorite = await this.prisma.favorite.findFirst({
      where: {
        userId,
        wordId: word.id,
      },
    });

    if (favorite) {
      throw new AppException(exceptions.favoriteAlreadyExist.friendlyMessage);
    }

    try {
      await this.prisma.favorite.create({
        data: {
          userId,
          wordId: word.id,
        },
      });
    } catch {
      throw new AppException(exceptions.favoriteError.friendlyMessage);
    }
  }

  async unfavorite(params: UnfavoriteDto) {
    const word = await this.prisma.word.findFirst({
      where: { word: params.word },
    });

    if (!word) {
      throw new AppException(exceptions.wordNotFound.friendlyMessage);
    }

    const userId = params.loggedUser?.id;
    if (!userId) {
      throw new AppException(exceptions.userInvalidUserId.friendlyMessage);
    }

    const favorite = await this.prisma.favorite.findFirst({
      where: {
        userId,
        wordId: word.id,
      },
    });

    if (!favorite) {
      throw new AppException(exceptions.favoriteError.friendlyMessage);
    }

    try {
      await this.prisma.favorite.delete({
        where: {
          id: favorite.id,
        },
      });
    } catch {
      throw new AppException(exceptions.unfavoriteError.friendlyMessage);
    }
  }

  protected async createOrUpdateHistory(wordId: string, userId: string) {
    if (!userId) {
      throw new AppException(exceptions.historyInvalidUserId.friendlyMessage);
    }

    if (!wordId) {
      throw new AppException(exceptions.historyInvalidWordId.friendlyMessage);
    }

    const history = await this.prisma.history.findFirst({
      where: {
        userId,
        wordId,
      },
    });

    if (history) {
      return await this.prisma.history.update({
        where: {
          id: history.id,
        },
        data: {
          added: new Date(),
        },
      });
    }
    return await this.prisma.history.create({
      data: {
        userId,
        wordId,
      },
    });
  }
}
