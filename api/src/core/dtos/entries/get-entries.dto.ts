import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetEntriesDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  search?: string;

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
