import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/core/dtos/pagination.dto';

export class GetEntriesDto extends PaginationDto {
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
