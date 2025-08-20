import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { GetHistoryDto } from './dtos/history.dto';
import { FavoritesDto } from './dtos/favorites.dto';
import { RequestWithUser } from '../../providers/auth/auth.types';

describe('UserController', () => {
  let controller: UserController;
  let userService: any;

  const mockUser = {
    id: '1',
    name: 'Test User',
  };

  const mockRequestUser: RequestWithUser = {
    user: mockUser,
  } as RequestWithUser;

  const mockUserProfile = {
    name: 'Test User',
    email: 'test@example.com',
  };

  const mockHistoryResult = {
    results: [
      { word: 'test', added: new Date('2024-01-01') },
      { word: 'example', added: new Date('2024-01-02') },
    ],
    hasNext: false,
    hasPrevious: false,
    totalDocs: 2,
  };

  const mockFavoritesResult = {
    results: [
      { word: 'favorite', added: new Date('2024-01-01') },
      { word: 'liked', added: new Date('2024-01-02') },
    ],
    hasNext: false,
    hasPrevious: false,
    totalDocs: 2,
  };

  beforeEach(async () => {
    const mockUserService = {
      me: jest.fn(),
      history: jest.fn(),
      favorites: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getProfile', () => {
    it('should return user profile', async () => {
      (userService.me as jest.Mock).mockResolvedValue(mockUserProfile);

      const result = await controller.getProfile(mockRequestUser);

      expect(userService.me).toHaveBeenCalledWith(mockRequestUser);
      expect(result).toEqual(mockUserProfile);
    });

    it('should handle service errors', async () => {
      const error = new Error('User not found');
      (userService.me as jest.Mock).mockRejectedValue(error);

      await expect(controller.getProfile(mockRequestUser)).rejects.toThrow(
        error,
      );
    });
  });

  describe('getHistory', () => {
    it('should return user history with query parameters', async () => {
      const query: GetHistoryDto = {
        limit: 10,
        cursor: undefined,
        orientation: 'desc',
        loggedUser: undefined,
      };
      (userService.history as jest.Mock).mockResolvedValue(mockHistoryResult);

      const result = await controller.getHistory(query, mockRequestUser);

      expect(userService.history).toHaveBeenCalledWith({
        ...query,
        loggedUser: mockUser,
      });
      expect(result).toEqual(mockHistoryResult);
    });

    it('should handle service errors for history', async () => {
      const query: GetHistoryDto = {
        limit: 10,
        cursor: undefined,
        orientation: 'desc',
        loggedUser: undefined,
      };
      const error = new Error('History not found');
      (userService.history as jest.Mock).mockRejectedValue(error);

      await expect(
        controller.getHistory(query, mockRequestUser),
      ).rejects.toThrow(error);
    });
  });

  describe('getFavorites', () => {
    it('should return user favorites with query parameters', async () => {
      const query: FavoritesDto = {
        limit: 20,
        cursor: undefined,
        orientation: 'desc',
        loggedUser: undefined,
      };
      (userService.favorites as jest.Mock).mockResolvedValue(
        mockFavoritesResult,
      );

      const result = await controller.getFavorites(query, mockRequestUser);

      expect(userService.favorites).toHaveBeenCalledWith({
        ...query,
        loggedUser: mockUser,
      });
      expect(result).toEqual(mockFavoritesResult);
    });

    it('should handle service errors for favorites', async () => {
      const query: FavoritesDto = {
        limit: 20,
        cursor: undefined,
        orientation: 'desc',
        loggedUser: undefined,
      };
      const error = new Error('Favorites not found');
      (userService.favorites as jest.Mock).mockRejectedValue(error);

      await expect(
        controller.getFavorites(query, mockRequestUser),
      ).rejects.toThrow(error);
    });
  });
});
