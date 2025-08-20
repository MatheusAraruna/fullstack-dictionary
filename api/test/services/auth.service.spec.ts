/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../../src/providers/auth/auth.service';
import { PrismaService } from '../../src/providers/database/prisma.service';
import { AppException } from '../../src/helpers/exception';
import { exceptions } from '../../src/config/exceptions';
import * as bcrypt from '../../src/helpers/bcrypt';
import * as validate from '../../src/utils/validate';

jest.mock('../../src/helpers/bcrypt');
jest.mock('../../src/utils/validate');

describe('AuthService', () => {
  let service: AuthService;
  let prismaService: {
    user: {
      findFirst: jest.Mock<any, any>;
      findUnique: jest.Mock<any, any>;
      create: jest.Mock<any, any>;
    };
  };
  let jwtService: any;

  const mockUser = {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    password: 'hashedPassword',
  };

  const mockToken = 'mockJwtToken';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findFirst: jest.fn(),
              findUnique: jest.fn(),
              create: jest.fn(),
            },
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn((...args: any[]) => undefined),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prismaService = module.get(PrismaService);
    jwtService = module.get(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('signin', () => {
    const signinDto = {
      email: 'test@example.com',
      password: 'password123',
    };

    it('should successfully sign in a user with valid credentials', async () => {
      prismaService.user.findFirst.mockResolvedValue(mockUser);
      (bcrypt.matchHash as jest.Mock).mockResolvedValue(true);
      jwtService.signAsync.mockResolvedValue(mockToken);

      const result = await service.signin(signinDto);

      expect(prismaService.user.findFirst).toHaveBeenCalledWith({
        where: { email: signinDto.email },
      });
      expect(bcrypt.matchHash).toHaveBeenCalledWith(
        signinDto.password,
        mockUser.password,
      );
      expect(jwtService.signAsync).toHaveBeenCalledWith({
        id: mockUser.id,
        name: mockUser.name,
      });
      expect(result).toEqual({
        id: mockUser.id,
        name: mockUser.name,
        token: mockToken,
      });
    });

    it('should throw AppException when user is not found', async () => {
      prismaService.user.findFirst.mockResolvedValue(null);

      await expect(service.signin(signinDto)).rejects.toThrow(
        new AppException(exceptions.userNotFound.friendlyMessage),
      );
      expect(prismaService.user.findFirst).toHaveBeenCalledWith({
        where: { email: signinDto.email },
      });
    });

    it('should throw AppException when password is invalid', async () => {
      prismaService.user.findFirst.mockResolvedValue(mockUser);
      (bcrypt.matchHash as jest.Mock).mockResolvedValue(false);

      await expect(service.signin(signinDto)).rejects.toThrow(
        new AppException(exceptions.userInvalidCredentials.friendlyMessage),
      );
    });
  });

  describe('signup', () => {
    const signupDto = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    };

    it('should successfully create a new user', async () => {
      // Arrange
      (validate.isValidEmail as jest.Mock).mockReturnValue(true);
      (validate.isValidPassword as jest.Mock).mockReturnValue(true);
      (bcrypt.generateHash as jest.Mock).mockResolvedValue('hashedPassword');
      prismaService.user.findUnique.mockResolvedValue(null);
      prismaService.user.create.mockResolvedValue(mockUser);
      jwtService.signAsync.mockResolvedValue(mockToken);

      const result = await service.signup(signupDto);

      expect(validate.isValidEmail).toHaveBeenCalledWith(signupDto.email);
      expect(validate.isValidPassword).toHaveBeenCalledWith(signupDto.password);
      expect(bcrypt.generateHash).toHaveBeenCalledWith(signupDto.password);
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { email: signupDto.email },
      });
      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: {
          ...signupDto,
          password: 'hashedPassword',
        },
      });
      expect(result).toEqual({
        id: mockUser.id,
        name: mockUser.name,
        token: mockToken,
      });
    });

    it('should throw AppException when email is invalid', async () => {
      (validate.isValidEmail as jest.Mock).mockReturnValue(false);

      await expect(service.signup(signupDto)).rejects.toThrow(
        new AppException(exceptions.userInvalidEmail.friendlyMessage),
      );
    });

    it('should throw AppException when password is too weak', async () => {
      (validate.isValidEmail as jest.Mock).mockReturnValue(true);
      (validate.isValidPassword as jest.Mock).mockReturnValue(false);

      await expect(service.signup(signupDto)).rejects.toThrow(
        new AppException(exceptions.userPasswordTooWeak.friendlyMessage),
      );
    });

    it('should throw AppException when user already exists', async () => {
      (validate.isValidEmail as jest.Mock).mockReturnValue(true);
      (validate.isValidPassword as jest.Mock).mockReturnValue(true);
      (bcrypt.generateHash as jest.Mock).mockResolvedValue('hashedPassword');
      prismaService.user.findUnique.mockResolvedValue(mockUser);

      await expect(service.signup(signupDto)).rejects.toThrow(
        new AppException(exceptions.userAlreadyExists.friendlyMessage),
      );
    });
  });
});
