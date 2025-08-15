import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { EntriesService } from './entries.service';
import { GetEntriesDto } from 'src/core/dtos/entries/get-entries.dto';

@Controller('entries/en')
export class EntriesController {
  constructor(private readonly entriesService: EntriesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async get(@Query() params: GetEntriesDto) {
    return await this.entriesService.get(params);
  }
}
