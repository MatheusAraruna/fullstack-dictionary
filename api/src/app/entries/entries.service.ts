import { HttpService } from '@nestjs/axios';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { GetEntriesDto } from 'src/core/dtos/entries/get-entries.dto';
import { GetWordDto } from 'src/core/dtos/entries/get-word.dto';
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
    const take = limit || 10;
    const skip = page ? (page - 1) * take : 0;
    const orderBy = orientation ? { word: orientation } : undefined;

    const entries = await this.prisma.word.findMany({
      where,
      skip: Number(skip),
      take: Number(take),
      orderBy,
      select: {
        word: true,
      },
    });

    if (!entries) {
      throw new Error('No entries found');
    }

    const entriesCount = await this.prisma.word.count({
      where,
    });

    const hasNext = skip + take < entriesCount;
    const hasPrev = skip > 0;

    return {
      results: entries.map((entry) => entry.word),
      total: entriesCount,
      page: Number(page) || 1,
      totalPages: Math.ceil(entriesCount / take),
      hasNext,
      hasPrev,
    };
  }

  async word(params: GetWordDto) {
    const word = await this.prisma.word.findFirst({
      where: { word: params.word },
    });

    if (!word) {
      throw new NotFoundException('Word not found');
    }

    const response = await this.httpService.axiosRef.get(params.word);

    if (response.status === 404) {
      throw new HttpException(
        'Failed to retrieve word information',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return response.data;
  }
}
