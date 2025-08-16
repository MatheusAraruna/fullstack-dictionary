import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import type { RequestWithUser } from 'src/providers/auth/auth.types';
import { GetHistoryDto } from './dtos/history.dto';
import { FavoritesDto } from './dtos/favorites.dto';

@Controller('user/me')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.NO_CONTENT)
  getProfile(@Request() req: RequestWithUser) {
    return this.userService.me(req);
  }

  @Get('/history')
  @HttpCode(HttpStatus.OK)
  getHistory(@Query() query: GetHistoryDto, @Request() req: RequestWithUser) {
    query.loggedUser = req.user;
    return this.userService.history(query);
  }

  @Get('/favorites')
  @HttpCode(HttpStatus.OK)
  getFavorites(@Query() query: FavoritesDto, @Request() req: RequestWithUser) {
    query.loggedUser = req.user;
    return this.userService.favorites(query);
  }
}
