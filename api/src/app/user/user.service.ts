import { Injectable } from '@nestjs/common';
import { exceptions } from 'src/config/exceptions';
import { AppException } from 'src/helpers/exception';
import { PrismaService } from 'src/providers/database/prisma.service';
import type { RequestWithUser } from 'src/providers/auth/auth.types';
import { GetHistoryDto } from './dtos/history.dto';
import { FavoritesDto } from './dtos/favorites.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async me(req: RequestWithUser) {
    const user = await this.prisma.user.findUnique({
      where: { id: req?.user?.id },
      select: {
        name: true,
        email: true,
      },
    });

    if (!user) {
      throw new AppException(exceptions.userNotFound.friendlyMessage);
    }

    return user;
  }

  async history(params: GetHistoryDto) {
    const { limit, cursor, loggedUser, orientation = 'desc' } = params;
    const take = Number(limit) || 10;
    const orderBy = orientation ? { added: orientation } : undefined;

    if (cursor) {
      const cursorHistory = await this.prisma.history.findUnique({
        where: { id: cursor },
      });

      if (!cursorHistory) {
        throw new AppException(exceptions.cursorNotFound.friendlyMessage);
      }
    }

    const histories = await this.prisma.history.findMany({
      where: { userId: loggedUser?.id },
      cursor: cursor ? { id: cursor } : undefined,
      select: {
        id: true,
        word: true,
        added: true,
      },
      take: take + 1,
      skip: cursor ? 1 : 0,
      orderBy,
    });

    if (!histories || histories.length === 0) {
      throw new AppException(exceptions.historyNotFound.friendlyMessage);
    }

    const count = await this.prisma.history.count({
      where: { userId: loggedUser?.id },
    });

    const hasNext = histories.length > take;
    const hasPrevious = !!cursor;

    const items = hasNext ? histories.slice(0, take) : histories;

    const nextCursor = hasNext ? items[items.length - 1].id : null;
    const previousCursor = cursor || null;

    const formattedHistories = items.map((history) => ({
      word: history.word.word,
      added: history.added,
    }));

    return {
      results: formattedHistories,
      previous: previousCursor,
      next: nextCursor,
      hasNext,
      hasPrevious,
      totalDocs: count,
    };
  }

  async favorites(params: FavoritesDto) {
    const { limit, orientation, cursor, loggedUser } = params;
    const take = Number(limit) || 20;
    const orderBy = orientation ? { added: orientation } : undefined;

    if (cursor) {
      const cursorFavorite = await this.prisma.favorite.findUnique({
        where: { id: cursor },
      });

      if (!cursorFavorite) {
        throw new AppException(exceptions.cursorNotFound.friendlyMessage);
      }
    }

    const where = {
      userId: loggedUser?.id,
    };

    const favorites = await this.prisma.favorite.findMany({
      where,
      include: {
        word: true,
      },
      cursor: cursor ? { id: cursor } : undefined,
      skip: cursor ? 1 : 0,
      take: take + 1,
      orderBy,
    });

    if (!favorites) {
      throw new AppException(exceptions.favoriteNotFound.friendlyMessage);
    }

    const count = await this.prisma.favorite.count({
      where,
    });

    const hasNext = favorites.length > take;
    const hasPrevious = !!cursor;

    const items = hasNext ? favorites.slice(0, take) : favorites;

    const nextCursor = hasNext ? items[items.length - 1].id : null;
    const previousCursor = hasPrevious ? items[0].id : null;

    const formattedFavorites = favorites.map((favorite) => ({
      word: favorite.word.word,
      added: favorite.added,
    }));

    return {
      results: formattedFavorites,
      previous: previousCursor,
      next: nextCursor,
      hasNext,
      hasPrevious,
      totalDocs: count,
    };
  }
}
