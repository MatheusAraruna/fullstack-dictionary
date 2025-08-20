import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { MetadataDto } from './metadata.dto';

export class CursorPaginationDto extends MetadataDto {
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
    description: 'Cursor for the next page of results.',
    required: false,
    type: String,
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  })
  @IsOptional()
  cursor?: string;
}
