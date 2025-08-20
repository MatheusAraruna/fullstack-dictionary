/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../../providers/database/prisma.service';
import { AppException } from '../../helpers/exception';
import { exceptions } from '../../config/exceptions';
import { GetHistoryDto } from './dtos/history.dto';
import { FavoritesDto } from './dtos/favorites.dto';
import { RequestWithUser } from '../../providers/auth/auth.types';

describe('UserService', () => {
  let service: UserService;
  let prismaService: jest.Mocked<PrismaService>;

  const mockUser = {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
  };

  const mockRequestUser: RequestWithUser = {
    user: {
      id: '1',
      name: 'Test User',
    },
  } as RequestWithUser;

  const mockHistory = [
    {
      id: '1',
      word: { word: 'test' },
      added: new Date('2024-01-01'),
    },
    {
      id: '2',
      word: { word: 'example' },
      added: new Date('2024-01-02'),
    },
  ];

  const mockFavorites = [
    {
      id: '1',
      word: { word: 'favorite' },
      added: new Date('2024-01-01'),
    },
    {
      id: '2',
      word: { word: 'liked' },
      added: new Date('2024-01-02'),
    },
  ];

  beforeEach(async () => {
    const mockPrismaService = {
      user: {
        findUnique: jest.fn(),
      },
      history: {
        findUnique: jest.fn(),
        findMany: jest.fn(),
        count: jest.fn(),
      },
      favorite: {
        findUnique: jest.fn(),
        findMany: jest.fn(),
        count: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prismaService = module.get(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('me', () => {
    it('should return user profile when user exists', async () => {
      const findUniqueMock = prismaService.user.findUnique as jest.Mock;
      findUniqueMock.mockResolvedValue(mockUser);

      const result = await service.me(mockRequestUser);

      expect(findUniqueMock).toHaveBeenCalledWith({
        where: { id: mockRequestUser.user.id },
        select: {
          name: true,
          email: true,
        },
      });
      expect(result).toEqual(mockUser);
    });

    it('should throw AppException when user not found', async () => {
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.me(mockRequestUser)).rejects.toThrow(
        new AppException(exceptions.userNotFound.friendlyMessage),
      );
    });
  });

  describe('history', () => {
    const historyDto: GetHistoryDto = {
      limit: 10,
      cursor: undefined,
      orientation: 'desc',
      loggedUser: mockRequestUser.user,
    };

    it('should return user history with pagination', async () => {
      (prismaService.history.findMany as jest.Mock).mockResolvedValue(
        mockHistory,
      );
      (prismaService.history.count as jest.Mock).mockResolvedValue(2);

      const result = await service.history(historyDto);

      expect(prismaService.history.findMany).toHaveBeenCalledWith({
        where: { userId: mockRequestUser.user.id },
        cursor: undefined,
        select: {
          id: true,
          word: true,
          added: true,
        },
        take: 11,
        skip: 0,
        orderBy: { added: 'desc' },
      });
      expect(result).toMatchObject({
        results: [
          { word: 'test', added: new Date('2024-01-01') },
          { word: 'example', added: new Date('2024-01-02') },
        ],
        hasNext: false,
        hasPrevious: false,
        totalDocs: 2,
      });
    });

    it('should handle cursor pagination', async () => {
      const historyDtoWithCursor: GetHistoryDto = {
        ...historyDto,
        cursor: 'cursor1',
      };
      (prismaService.history.findUnique as jest.Mock).mockResolvedValue({
        id: 'cursor1',
      });
      (prismaService.history.findMany as jest.Mock).mockResolvedValue(
        mockHistory,
      );
      (prismaService.history.count as jest.Mock).mockResolvedValue(2);

      const result = await service.history(historyDtoWithCursor);

      expect(prismaService.history.findUnique).toHaveBeenCalledWith({
        where: { id: 'cursor1' },
      });
      expect(result.hasPrevious).toBe(true);
    });

    it('should throw AppException when cursor not found', async () => {
      const historyDtoWithInvalidCursor: GetHistoryDto = {
        ...historyDto,
        cursor: 'invalid-cursor',
      };
      (prismaService.history.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(
        service.history(historyDtoWithInvalidCursor),
      ).rejects.toThrow(
        new AppException(exceptions.cursorNotFound.friendlyMessage),
      );
    });

    it('should throw AppException when no history found', async () => {
      (prismaService.history.findMany as jest.Mock).mockResolvedValue([]);

      await expect(service.history(historyDto)).rejects.toThrow(
        new AppException(exceptions.historyNotFound.friendlyMessage),
      );
    });
  });

  describe('favorites', () => {
    const favoritesDto: FavoritesDto = {
      limit: 20,
      cursor: undefined,
      orientation: 'desc',
      loggedUser: mockRequestUser.user,
    };

    it('should return user favorites with pagination', async () => {
      (prismaService.favorite.findMany as jest.Mock).mockResolvedValue(
        mockFavorites,
      );
      (prismaService.favorite.count as jest.Mock).mockResolvedValue(2);

      const result = await service.favorites(favoritesDto);

      expect(prismaService.favorite.findMany).toHaveBeenCalledWith({
        where: { userId: mockRequestUser.user.id },
        include: { word: true },
        cursor: undefined,
        skip: 0,
        take: 21,
        orderBy: { added: 'desc' },
      });
      expect(result).toMatchObject({
        results: [
          { word: 'favorite', added: new Date('2024-01-01') },
          { word: 'liked', added: new Date('2024-01-02') },
        ],
        hasNext: false,
        hasPrevious: false,
        totalDocs: 2,
      });
    });

    it('should handle cursor for favorites', async () => {
      const favoritesWithCursor: FavoritesDto = {
        ...favoritesDto,
        cursor: 'fav-cursor',
      };
      (prismaService.favorite.findUnique as jest.Mock).mockResolvedValue({
        id: 'fav-cursor',
      });
      (prismaService.favorite.findMany as jest.Mock).mockResolvedValue(
        mockFavorites,
      );
      (prismaService.favorite.count as jest.Mock).mockResolvedValue(2);

      await service.favorites(favoritesWithCursor);

      expect(prismaService.favorite.findUnique).toHaveBeenCalledWith({
        where: { id: 'fav-cursor' },
      });
    });

    it('should throw AppException when favorites cursor not found', async () => {
      const favoritesWithInvalidCursor: FavoritesDto = {
        ...favoritesDto,
        cursor: 'invalid-fav-cursor',
      };
      (prismaService.favorite.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(
        service.favorites(favoritesWithInvalidCursor),
      ).rejects.toThrow(
        new AppException(exceptions.cursorNotFound.friendlyMessage),
      );
    });
  });
});
