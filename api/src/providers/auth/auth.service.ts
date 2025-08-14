import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { matchHash } from 'src/helpers/bcrypt';
import { SigninDto } from 'src/providers/auth/dtos/signin.dto';
import { PrismaService } from 'src/providers/database/prisma.service';

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

    const payload = { sub: user.id, name: user.name, email: user.email };
    const token = await this.jwtService.signAsync(payload);
    return {
      ...payload,
      token,
    };
  }
}
