import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { EntriesService } from './entries.service';
import { GetEntriesDto } from 'src/app/entries/dtos/get-entries.dto';
import { GetWordDto } from 'src/app/entries/dtos/get-word.dto';
import type { RequestWithUser } from 'src/providers/auth/auth.types';
import { FavoriteDto } from './dtos/favorite-dto';
import {
  ApiBadRequestResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Entries')
@Controller('entries/en')
export class EntriesController {
  constructor(private readonly entriesService: EntriesService) {}

  @ApiOperation({
    summary: 'Get all entries',
    description: 'Retrieves a list of all entries.',
  })
  @ApiOkResponse({ description: 'List of entries retrieved successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid request parameters.' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async get(@Query() params: GetEntriesDto) {
    return await this.entriesService.get(params);
  }

  @ApiOperation({
    summary: 'Get a specific entry by word',
    description: 'Retrieves a specific entry based on the provided word.',
  })
  @ApiOkResponse({ description: 'Entry retrieved successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid request parameters.' })
  @Get('/:word')
  @HttpCode(HttpStatus.OK)
  async word(@Param() params: GetWordDto, @Request() req: RequestWithUser) {
    params.loggedUser = req.user;
    return await this.entriesService.word(params);
  }

  @ApiOperation({
    summary: 'Favorite a specific entry',
    description: "Adds a specific entry to the user's favorites.",
  })
  @ApiOkResponse({ description: 'Entry favorited successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid request parameters.' })
  @Post('/:word/favorite')
  @HttpCode(HttpStatus.OK)
  async favorite(
    @Param() params: FavoriteDto,
    @Request() req: RequestWithUser,
  ) {
    params.loggedUser = req.user;
    return await this.entriesService.favorite(params);
  }

  @ApiOperation({
    summary: 'Unfavorite a specific entry',
    description: "Removes a specific entry from the user's favorites.",
  })
  @ApiNoContentResponse({ description: 'Entry unfavorited successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid request parameters.' })
  @Delete('/:word/unfavorite')
  @HttpCode(HttpStatus.NO_CONTENT)
  async unfavorite(
    @Param() params: FavoriteDto,
    @Request() req: RequestWithUser,
  ) {
    params.loggedUser = req.user;
    return await this.entriesService.unfavorite(params);
  }
}
