import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
  Request,
} from '@nestjs/common';
import { EntriesService } from './entries.service';
import { GetEntriesDto } from 'src/app/entries/dtos/get-entries.dto';
import { GetWordDto } from 'src/app/entries/dtos/get-word.dto';
import type { RequestWithUser } from 'src/providers/auth/auth.types';

@Controller('entries/en')
export class EntriesController {
  constructor(private readonly entriesService: EntriesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async get(@Query() params: GetEntriesDto) {
    return await this.entriesService.get(params);
  }

  @Get('/:word')
  @HttpCode(HttpStatus.OK)
  async word(@Param() params: GetWordDto, @Request() req: RequestWithUser) {
    params.loggedUser = req.user;
    return await this.entriesService.word(params);
  }
}
