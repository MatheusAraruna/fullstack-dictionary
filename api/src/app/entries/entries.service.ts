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
    const { limit, cursor } = params;
    const take = Number(limit) || 10;

    if (cursor) {
      const cursorEntry = await this.prisma.word.findUnique({
        where: { id: cursor },
      });

      if (!cursorEntry) {
        throw new AppException(exceptions.cursorNotFound.friendlyMessage);
      }
    }

    const entries = await this.prisma.word.findMany({
      select: {
        id: true,
        word: true,
      },
      take: take + 1,
      cursor: cursor ? { id: cursor } : undefined,
      skip: cursor ? 1 : 0,
    });

    if (!entries) {
      throw new AppException(exceptions.wordsNotFound.friendlyMessage);
    }

    const count = await this.prisma.word.count();

    const hasNext = entries.length > take;
    const hasPrevious = !!cursor;

    const items = hasNext ? entries.slice(0, take) : entries;

    const nextCursor = hasNext ? items[items.length - 1].id : null;
    const previousCursor = hasPrevious ? items[0].id : null;

    return {
      results: items.map((entry) => entry.word),
      previous: previousCursor,
      next: nextCursor,
      hasNext,
      hasPrevious,
      totalDocs: count,
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
