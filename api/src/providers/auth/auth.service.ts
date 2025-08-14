import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { generateHash, matchHash } from 'src/helpers/bcrypt';
import { SigninDto } from 'src/providers/auth/dtos/signin.dto';
import { PrismaService } from 'src/providers/database/prisma.service';
import { SignupDto } from './dtos/signup.dot';

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
      throw new Error('User not found');
    }

    const isPasswordValid = await matchHash(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
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
    const hashedPassword = await generateHash(data.password);
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (user) {
      throw new ConflictException('User already exists');
    }

    const newUser = await this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    const payload = {
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
