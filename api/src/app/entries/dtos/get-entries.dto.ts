import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CursorPaginationDto } from 'src/core/dtos/cursor-pagination';

export class GetEntriesDto extends CursorPaginationDto {
  @ApiProperty({
    description: 'Search term for filtering entries',
    required: false,
    type: String,
    example: 'example',
  })
  @IsString()
  @IsOptional()
  search?: string;
}
