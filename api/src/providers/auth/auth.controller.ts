import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from 'src/providers/auth/dtos/signin.dto';
import { Public } from './decorators/public.decorator';
import { SignupDto } from './dtos/signup.dot';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'User sign-in',
    description: 'Allows users to sign in with their credentials.',
  })
  @ApiOkResponse({ description: 'User signed in successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid credentials.' })
  @Public()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signin(@Body() signinDto: SigninDto) {
    return this.authService.signin(signinDto);
  }

  @ApiOperation({
    summary: 'User sign-up',
    description: 'Allows users to create a new account.',
  })
  @ApiOkResponse({ description: 'User signed up successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid sign-up data.' })
  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }
}
