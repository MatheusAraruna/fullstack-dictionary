import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/core/dtos/pagination.dto';

export class FavoritesDto extends PaginationDto {
  @ApiProperty({
    description: 'Search term to filter favorites',
    required: false,
    type: String,
    example: 'book',
  })
  @IsString()
  @IsOptional()
  search?: string;
}
