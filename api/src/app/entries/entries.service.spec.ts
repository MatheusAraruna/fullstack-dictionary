import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { EntriesService } from './entries.service';
import { PrismaService } from '../../providers/database/prisma.service';
import { AppException } from '../../helpers/exception';
import { exceptions } from '../../config/exceptions';
import { GetEntriesDto } from './dtos/get-entries.dto';
import { GetWordDto } from './dtos/get-word.dto';
import { FavoriteDto } from './dtos/favorite-dto';
import { UnfavoriteDto } from './dtos/unfavorite-dto';
import { AxiosResponse } from 'axios';

describe('EntriesService', () => {
  let service: EntriesService;
  let prismaService: any;
  let httpService: any;

  const mockWord = {
    id: '1',
    word: 'test',
  };

  const mockUser = {
    id: '1',
    name: 'Test User',
  };

  const mockFavorite = {
    id: '1',
    userId: '1',
    wordId: '1',
  };

  const mockHistory = {
    id: '1',
    userId: '1',
    wordId: '1',
    added: new Date(),
  };

  const mockAxiosResponse: AxiosResponse = {
    data: [{ word: 'test', meaning: 'a trial' }],
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {} as any,
  };

  beforeEach(async () => {
    const mockPrismaService = {
      word: {
        findUnique: jest.fn(),
        findFirst: jest.fn(),
        findMany: jest.fn(),
        count: jest.fn(),
      },
      favorite: {
        findFirst: jest.fn(),
        create: jest.fn(),
        delete: jest.fn(),
      },
      history: {
        findFirst: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
      },
    };

    const mockHttpService = {
      axiosRef: {
        get: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EntriesService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
      ],
    }).compile();

    service = module.get<EntriesService>(EntriesService);
    prismaService = module.get(PrismaService);
    httpService = module.get(HttpService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('get', () => {
    const getEntriesDto: GetEntriesDto = {
      limit: 20,
      cursor: undefined,
    };

    it('should return paginated words list', async () => {
      const mockWords = [mockWord, { id: '2', word: 'example' }];
      (prismaService.word.findMany as jest.Mock).mockResolvedValue(mockWords);
      (prismaService.word.count as jest.Mock).mockResolvedValue(2);

      const result = await service.get(getEntriesDto);

      expect(prismaService.word.findMany).toHaveBeenCalledWith({
        select: {
          id: true,
          word: true,
        },
        take: 21,
        cursor: undefined,
        skip: 0,
      });
      expect(result).toMatchObject({
        results: ['test', 'example'],
        hasNext: false,
        hasPrevious: false,
        totalDocs: 2,
      });
    });

    it('should handle cursor pagination', async () => {
      const getEntriesWithCursor: GetEntriesDto = {
        limit: 20,
        cursor: 'cursor1',
      };
      (prismaService.word.findUnique as jest.Mock).mockResolvedValue({
        id: 'cursor1',
      });
      (prismaService.word.findMany as jest.Mock).mockResolvedValue([mockWord]);
      (prismaService.word.count as jest.Mock).mockResolvedValue(1);

      const result = await service.get(getEntriesWithCursor);

      expect(prismaService.word.findUnique).toHaveBeenCalledWith({
        where: { id: 'cursor1' },
      });
      expect(result.hasPrevious).toBe(true);
    });

    it('should throw AppException when cursor not found', async () => {
      const getEntriesWithInvalidCursor: GetEntriesDto = {
        limit: 20,
        cursor: 'invalid-cursor',
      };
      (prismaService.word.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.get(getEntriesWithInvalidCursor)).rejects.toThrow(
        new AppException(exceptions.cursorNotFound.friendlyMessage),
      );
    });
  });

  describe('word', () => {
    const getWordDto: GetWordDto = {
      word: 'test',
      loggedUser: mockUser,
    };

    it('should return word details with dictionary data', async () => {
      (prismaService.word.findFirst as jest.Mock).mockResolvedValue(mockWord);
      (prismaService.favorite.findFirst as jest.Mock).mockResolvedValue(null);
      (httpService.axiosRef.get as jest.Mock).mockResolvedValue(
        mockAxiosResponse,
      );
      jest
        .spyOn(service as any, 'createOrUpdateHistory')
        .mockResolvedValue(mockHistory);

      const result = await service.word(getWordDto);

      expect(prismaService.word.findFirst).toHaveBeenCalledWith({
        where: { word: 'test' },
      });
      expect(httpService.axiosRef.get).toHaveBeenCalledWith('test');
      expect(result).toMatchObject({
        dictionary: mockAxiosResponse.data,
        favorited: false,
      });
    });

    it('should return favorited status when word is favorited', async () => {
      (prismaService.word.findFirst as jest.Mock).mockResolvedValue(mockWord);
      (prismaService.favorite.findFirst as jest.Mock).mockResolvedValue(
        mockFavorite,
      );
      (httpService.axiosRef.get as jest.Mock).mockResolvedValue(
        mockAxiosResponse,
      );
      jest
        .spyOn(service as any, 'createOrUpdateHistory')
        .mockResolvedValue(mockHistory);

      const result = await service.word(getWordDto);

      expect(result.favorited).toBe(true);
    });

    it('should throw AppException when word not found', async () => {
      (prismaService.word.findFirst as jest.Mock).mockResolvedValue(null);

      await expect(service.word(getWordDto)).rejects.toThrow(
        new AppException(exceptions.wordNotFound.friendlyMessage),
      );
    });

    it('should throw AppException when user ID is invalid', async () => {
      const invalidUserDto: GetWordDto = {
        word: 'test',
        loggedUser: undefined,
      };
      (prismaService.word.findFirst as jest.Mock).mockResolvedValue(mockWord);
      (prismaService.favorite.findFirst as jest.Mock).mockResolvedValue(null);

      await expect(service.word(invalidUserDto)).rejects.toThrow(
        new AppException(exceptions.historyInvalidUserId.friendlyMessage),
      );
    });
  });

  describe('favorite', () => {
    const favoriteDto: FavoriteDto = {
      word: 'test',
      loggedUser: mockUser,
    };

    it('should successfully add word to favorites', async () => {
      (prismaService.word.findFirst as jest.Mock).mockResolvedValue(mockWord);
      (prismaService.favorite.findFirst as jest.Mock).mockResolvedValue(null);
      (prismaService.favorite.create as jest.Mock).mockResolvedValue(
        mockFavorite,
      );

      await service.favorite(favoriteDto);

      expect(prismaService.favorite.create).toHaveBeenCalledWith({
        data: {
          userId: '1',
          wordId: '1',
        },
      });
    });

    it('should throw AppException when word not found', async () => {
      (prismaService.word.findFirst as jest.Mock).mockResolvedValue(null);

      await expect(service.favorite(favoriteDto)).rejects.toThrow(
        new AppException(exceptions.wordNotFound.friendlyMessage),
      );
    });

    it('should throw AppException when word already favorited', async () => {
      (prismaService.word.findFirst as jest.Mock).mockResolvedValue(mockWord);
      (prismaService.favorite.findFirst as jest.Mock).mockResolvedValue(
        mockFavorite,
      );

      await expect(service.favorite(favoriteDto)).rejects.toThrow(
        new AppException(exceptions.favoriteAlreadyExist.friendlyMessage),
      );
    });

    it('should throw AppException when user ID is invalid', async () => {
      const invalidFavoriteDto: FavoriteDto = {
        word: 'test',
        loggedUser: undefined,
      };
      (prismaService.word.findFirst as jest.Mock).mockResolvedValue(mockWord);

      await expect(service.favorite(invalidFavoriteDto)).rejects.toThrow(
        new AppException(exceptions.userInvalidUserId.friendlyMessage),
      );
    });
  });

  describe('unfavorite', () => {
    const unfavoriteDto: UnfavoriteDto = {
      word: 'test',
      loggedUser: mockUser,
    };

    it('should successfully remove word from favorites', async () => {
      (prismaService.word.findFirst as jest.Mock).mockResolvedValue(mockWord);
      (prismaService.favorite.findFirst as jest.Mock).mockResolvedValue(
        mockFavorite,
      );
      (prismaService.favorite.delete as jest.Mock).mockResolvedValue(
        mockFavorite,
      );

      await service.unfavorite(unfavoriteDto);

      expect(prismaService.favorite.delete).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('should throw AppException when word not found', async () => {
      (prismaService.word.findFirst as jest.Mock).mockResolvedValue(null);

      await expect(service.unfavorite(unfavoriteDto)).rejects.toThrow(
        new AppException(exceptions.wordNotFound.friendlyMessage),
      );
    });

    it('should throw AppException when favorite not found', async () => {
      (prismaService.word.findFirst as jest.Mock).mockResolvedValue(mockWord);
      (prismaService.favorite.findFirst as jest.Mock).mockResolvedValue(null);

      await expect(service.unfavorite(unfavoriteDto)).rejects.toThrow(
        new AppException(exceptions.favoriteError.friendlyMessage),
      );
    });
  });

  describe('createOrUpdateHistory', () => {
    it('should create new history entry when not exists', async () => {
      (prismaService.history.findFirst as jest.Mock).mockResolvedValue(null);
      (prismaService.history.create as jest.Mock).mockResolvedValue(
        mockHistory,
      );

      await (service as any).createOrUpdateHistory('1', '1');

      expect(prismaService.history.create).toHaveBeenCalledWith({
        data: {
          userId: '1',
          wordId: '1',
        },
      });
    });

    it('should update existing history entry', async () => {
      (prismaService.history.findFirst as jest.Mock).mockResolvedValue(
        mockHistory,
      );
      (prismaService.history.update as jest.Mock).mockResolvedValue(
        mockHistory,
      );

      await (service as any).createOrUpdateHistory('1', '1');

      expect(prismaService.history.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: { added: expect.any(Date) },
      });
    });

    it('should throw AppException when userId is invalid', async () => {
      await expect(
        (service as any).createOrUpdateHistory('1', null),
      ).rejects.toThrow(
        new AppException(exceptions.historyInvalidUserId.friendlyMessage),
      );
    });

    it('should throw AppException when wordId is invalid', async () => {
      await expect(
        (service as any).createOrUpdateHistory(null, '1'),
      ).rejects.toThrow(
        new AppException(exceptions.historyInvalidWordId.friendlyMessage),
      );
    });
  });
});
