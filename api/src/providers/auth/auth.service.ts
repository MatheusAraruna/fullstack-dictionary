import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { generateHash, matchHash } from 'src/helpers/bcrypt';
import { SigninDto } from 'src/providers/auth/dtos/signin.dto';
import { PrismaService } from 'src/providers/database/prisma.service';
import { SignupDto } from './dtos/signup.dot';
import { AppException } from 'src/helpers/exception';
import { exceptions } from 'src/config/exceptions';
import { isValidEmail, isValidPassword } from 'src/utils/validate';
import { UserMetadata } from './auth.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signin({ email, password }: SigninDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new AppException(exceptions.userNotFound.friendlyMessage);
    }

    const isPasswordValid = await matchHash(password, user.password);
    if (!isPasswordValid) {
      throw new AppException(exceptions.userInvalidCredentials.friendlyMessage);
    }

    const payload: Pick<UserMetadata, 'id' | 'name'> = {
      id: user.id,
      name: user.name,
    };
    const token = await this._signAsync(payload);
    return {
      ...payload,
      token,
    };
  }

  async signup(data: SignupDto) {
    const isEmailValid = isValidEmail(data.email);
    if (!isEmailValid) {
      throw new AppException(exceptions.userInvalidEmail.friendlyMessage);
    }

    const isPasswordStrong = isValidPassword(data.password);
    if (!isPasswordStrong) {
      throw new AppException(exceptions.userPasswordTooWeak.friendlyMessage);
    }

    const hashedPassword = await generateHash(data.password);
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (user) {
      throw new AppException(exceptions.userAlreadyExists.friendlyMessage);
    }

    const newUser = await this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    const payload: Pick<UserMetadata, 'id' | 'name'> = {
      id: newUser.id,
      name: newUser.name,
    };

    const token = await this._signAsync(payload);
    return {
      ...payload,
      token,
    };
  }

  private async _signAsync(payload: Record<string, string>) {
    return this.jwtService.signAsync(payload);
  }
}
