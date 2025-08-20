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
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('User')
@Controller('user/me')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Get user profile',
    description: 'Retrieves the profile information of the logged-in user.',
  })
  @ApiOkResponse({ description: 'User profile retrieved successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid request.' })
  @Get()
  @HttpCode(HttpStatus.OK)
  getProfile(@Request() req: RequestWithUser) {
    return this.userService.me(req);
  }

  @ApiOperation({
    summary: 'Get user activity history',
    description: 'Retrieves the activity history of the logged-in user.',
  })
  @ApiOkResponse({
    description: 'User activity history retrieved successfully.',
  })
  @ApiBadRequestResponse({ description: 'Invalid request.' })
  @Get('/history')
  @HttpCode(HttpStatus.OK)
  getHistory(@Query() query: GetHistoryDto, @Request() req: RequestWithUser) {
    query.loggedUser = req.user;
    return this.userService.history(query);
  }

  @ApiOperation({
    summary: 'Get user favorites',
    description: 'Retrieves the favorite items of the logged-in user.',
  })
  @ApiOkResponse({
    description: 'User favorites retrieved successfully.',
  })
  @ApiBadRequestResponse({ description: 'Invalid request.' })
  @Get('/favorites')
  @HttpCode(HttpStatus.OK)
  getFavorites(@Query() query: FavoritesDto, @Request() req: RequestWithUser) {
    query.loggedUser = req.user;
    return this.userService.favorites(query);
  }
}
