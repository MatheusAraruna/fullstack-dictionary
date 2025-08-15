import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';
import { EntriesService } from './entries.service';
import { GetEntriesDto } from 'src/core/dtos/entries/get-entries.dto';
import { GetWordDto } from 'src/core/dtos/entries/get-word.dto';

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
  async word(@Param() params: GetWordDto) {
    return await this.entriesService.word(params);
  }
}
