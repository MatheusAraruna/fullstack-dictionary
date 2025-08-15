import { Injectable } from '@nestjs/common';
import { GetEntriesDto } from 'src/core/dtos/entries/get-entries.dto';
import { PrismaService } from 'src/providers/database/prisma.service';

@Injectable()
export class EntriesService {
  constructor(private readonly prisma: PrismaService) {}

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
}
