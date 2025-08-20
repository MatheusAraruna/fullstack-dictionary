/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SigninDto } from './dtos/signin.dto';
import { SignupDto } from './dtos/signup.dot';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: jest.Mocked<AuthService>;

  const mockAuthResult = {
    id: '1',
    name: 'Test User',
    token: 'mockJwtToken',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signin: jest.fn(),
            signup: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('signin', () => {
    it('should successfully sign in a user', async () => {
      const signinDto: SigninDto = {
        email: 'test@example.com',
        password: 'password123',
      };
      authService.signin.mockResolvedValue(mockAuthResult);

      const result = await controller.signin(signinDto);

      expect(authService.signin).toHaveBeenCalledWith(signinDto);
      expect(result).toEqual(mockAuthResult);
    });

    it('should handle service errors', async () => {
      const signinDto: SigninDto = {
        email: 'test@example.com',
        password: 'wrongpassword',
      };
      const error = new Error('Invalid credentials');
      authService.signin.mockRejectedValue(error);

      await expect(controller.signin(signinDto)).rejects.toThrow(error);
      expect(authService.signin).toHaveBeenCalledWith(signinDto);
    });
  });

  describe('signup', () => {
    it('should successfully sign up a user', async () => {
      const signupDto: SignupDto = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      };
      authService.signup.mockResolvedValue(mockAuthResult);

      const result = await controller.signup(signupDto);

      expect(authService.signup).toHaveBeenCalledWith(signupDto);
      expect(result).toEqual(mockAuthResult);
    });

    it('should handle service errors during signup', async () => {
      const signupDto: SignupDto = {
        name: 'Test User',
        email: 'existing@example.com',
        password: 'password123',
      };
      const error = new Error('User already exists');
      authService.signup.mockRejectedValue(error);

      await expect(controller.signup(signupDto)).rejects.toThrow(error);
      expect(authService.signup).toHaveBeenCalledWith(signupDto);
    });
  });
});
