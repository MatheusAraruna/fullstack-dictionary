import { Test, TestingModule } from '@nestjs/testing';
import { EntriesController } from '../../src/app/entries/entries.controller';
import { EntriesService } from '../../src/app/entries/entries.service';
import { GetEntriesDto } from '../../src/app/entries/dtos/get-entries.dto';
import { GetWordDto } from '../../src/app/entries/dtos/get-word.dto';
import { FavoriteDto } from '../../src/app/entries/dtos/favorite-dto';
import { RequestWithUser } from '../../src/providers/auth/auth.types';

describe('EntriesController', () => {
  let controller: EntriesController;
  let entriesService: any;

  const mockUser = {
    id: '1',
    name: 'Test User',
  };

  const mockRequestUser: RequestWithUser = {
    user: mockUser,
  } as RequestWithUser;

  const mockEntriesResult = {
    results: ['test', 'example', 'word'],
    hasNext: false,
    hasPrevious: false,
    totalDocs: 3,
  };

  const mockWordResult = {
    dictionary: [{ word: 'test', meaning: 'a trial' }],
    favorited: false,
  };

  beforeEach(async () => {
    const mockEntriesService = {
      get: jest.fn(),
      word: jest.fn(),
      favorite: jest.fn(),
      unfavorite: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntriesController],
      providers: [
        {
          provide: EntriesService,
          useValue: mockEntriesService,
        },
      ],
    }).compile();

    controller = module.get<EntriesController>(EntriesController);
    entriesService = module.get(EntriesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('get', () => {
    it('should return paginated entries', async () => {
      const params: GetEntriesDto = {
        limit: 20,
        cursor: undefined,
      };
      (entriesService.get as jest.Mock).mockResolvedValue(mockEntriesResult);

      const result = await controller.get(params);

      expect(entriesService.get).toHaveBeenCalledWith(params);
      expect(result).toEqual(mockEntriesResult);
    });

    it('should handle service errors', async () => {
      const params: GetEntriesDto = {
        limit: 20,
        cursor: 'invalid',
      };
      const error = new Error('Cursor not found');
      (entriesService.get as jest.Mock).mockRejectedValue(error);

      await expect(controller.get(params)).rejects.toThrow(error);
    });
  });

  describe('word', () => {
    it('should return word details with dictionary data', async () => {
      const params: GetWordDto = {
        word: 'test',
        loggedUser: undefined,
      };
      (entriesService.word as jest.Mock).mockResolvedValue(mockWordResult);

      const result = await controller.word(params, mockRequestUser);

      expect(entriesService.word).toHaveBeenCalledWith({
        ...params,
        loggedUser: mockUser,
      });
      expect(result).toEqual(mockWordResult);
    });

    it('should handle service errors for word lookup', async () => {
      const params: GetWordDto = {
        word: 'nonexistent',
        loggedUser: undefined,
      };
      const error = new Error('Word not found');
      (entriesService.word as jest.Mock).mockRejectedValue(error);

      await expect(controller.word(params, mockRequestUser)).rejects.toThrow(
        error,
      );
    });
  });

  describe('favorite', () => {
    it('should successfully add word to favorites', async () => {
      const params: FavoriteDto = {
        word: 'test',
        loggedUser: undefined,
      };
      (entriesService.favorite as jest.Mock).mockResolvedValue(undefined);

      const result = await controller.favorite(params, mockRequestUser);

      expect(entriesService.favorite).toHaveBeenCalledWith({
        ...params,
        loggedUser: mockUser,
      });
      expect(result).toBeUndefined();
    });

    it('should handle service errors when favoriting', async () => {
      const params: FavoriteDto = {
        word: 'test',
        loggedUser: undefined,
      };
      const error = new Error('Word already favorited');
      (entriesService.favorite as jest.Mock).mockRejectedValue(error);

      await expect(
        controller.favorite(params, mockRequestUser),
      ).rejects.toThrow(error);
    });
  });

  describe('unfavorite', () => {
    it('should successfully remove word from favorites', async () => {
      const params: FavoriteDto = {
        word: 'test',
        loggedUser: undefined,
      };
      (entriesService.unfavorite as jest.Mock).mockResolvedValue(undefined);

      const result = await controller.unfavorite(params, mockRequestUser);

      expect(entriesService.unfavorite).toHaveBeenCalledWith({
        ...params,
        loggedUser: mockUser,
      });
      expect(result).toBeUndefined();
    });

    it('should handle service errors when unfavoriting', async () => {
      const params: FavoriteDto = {
        word: 'test',
        loggedUser: undefined,
      };
      const error = new Error('Favorite not found');
      (entriesService.unfavorite as jest.Mock).mockRejectedValue(error);

      await expect(
        controller.unfavorite(params, mockRequestUser),
      ).rejects.toThrow(error);
    });
  });
});
