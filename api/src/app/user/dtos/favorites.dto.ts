import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/core/dtos/pagination.dto';

export class FavoritesDto extends PaginationDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  search?: string;
}
