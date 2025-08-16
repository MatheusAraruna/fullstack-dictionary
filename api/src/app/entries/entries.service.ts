import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { exceptions } from 'src/config/exceptions';
import { GetEntriesDto } from 'src/app/entries/dtos/get-entries.dto';
import { GetWordDto } from 'src/app/entries/dtos/get-word.dto';
import { AppException } from 'src/helpers/exception';
import { paginate, preparePaginate } from 'src/helpers/paginate';
import { PrismaService } from 'src/providers/database/prisma.service';

@Injectable()
export class EntriesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
  ) {}

  async get(params: GetEntriesDto) {
    const { search, limit, page, orientation } = params;

    const where = search ? { word: { contains: search } } : {};
    const { skip, take } = preparePaginate(page, limit);
    const orderBy = orientation ? { word: orientation } : undefined;

    const entries = await this.prisma.word.findMany({
      where,
      skip,
      take,
      orderBy,
      select: {
        word: true,
      },
    });

    if (!entries) {
      throw new AppException(exceptions.wordsNotFound.friendlyMessage);
    }

    const count = await this.prisma.word.count({
      where,
    });

    const pagination = paginate({
      data: entries.map((entry) => entry.word),
      page: Number(page) || 1,
      take: take,
      total: count,
    });

    return pagination;
  }

  async word(params: GetWordDto) {
    const word = await this.prisma.word.findFirst({
      where: { word: params.word },
    });

    if (!word) {
      throw new AppException(exceptions.wordNotFound.friendlyMessage);
    }

    const response = await this.httpService.axiosRef.get(params.word);

    if (response.status === 404) {
      throw new AppException(exceptions.wordBadRequest.friendlyMessage);
    }

    const userId = params.loggedUser?.id;
    const wordId = word.id;

    if (!userId) {
      throw new AppException(exceptions.historyInvalidUserId.friendlyMessage);
    }

    if (!wordId) {
      throw new AppException(exceptions.historyInvalidWordId.friendlyMessage);
    }

    const history = await this.prisma.history.create({
      data: {
        userId,
        wordId,
      },
    });

    if (!history) {
      throw new AppException(exceptions.historySaveError.friendlyMessage);
    }

    return response.data;
  }
}
