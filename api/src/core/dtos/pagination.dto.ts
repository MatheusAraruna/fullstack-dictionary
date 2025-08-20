import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumber, IsOptional } from 'class-validator';
import { MetadataDto } from './metadata.dto';

export class PaginationDto extends MetadataDto {
  @ApiProperty({
    description: 'Maximum number of items to be returned in the response.',
    required: false,
    type: Number,
    example: 20,
  })
  @IsNumber()
  @IsOptional()
  limit?: number;

  @ApiProperty({
    description: 'Page number to be returned in the response.',
    required: false,
    type: Number,
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiProperty({
    description: 'Sorting order of the results.',
    required: false,
    enum: ['asc', 'desc'],
    example: 'asc',
  })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  orientation?: 'asc' | 'desc' = 'asc';
}
