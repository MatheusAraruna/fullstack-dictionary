import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumber, IsOptional } from 'class-validator';
import { MetadataDto } from './metadata.dto';

export class PaginationDto extends MetadataDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  limit?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiProperty({ enum: ['asc', 'desc'] })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  orientation?: 'asc' | 'desc' = 'asc';
}
