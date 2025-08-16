import { Controller, Get, Query, Request } from '@nestjs/common';
import { UserService } from './user.service';
import type { RequestWithUser } from 'src/providers/auth/auth.types';
import { GetHistoryDto } from './dtos/history.dto';

@Controller('user/me')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getProfile(@Request() req: RequestWithUser) {
    return this.userService.me(req);
  }

  @Get('/history')
  getHistory(@Query() query: GetHistoryDto, @Request() req: RequestWithUser) {
    query.loggedUser = req.user;
    return this.userService.history(query);
  }
}
