import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { MetadataDto } from 'src/core/dtos/metadata.dto';

export class UnfavoriteDto extends MetadataDto {
  @ApiProperty({
    description: 'Word to unfavorite',
    required: true,
    type: String,
    example: 'example',
  })
  @IsString()
  word: string;
}
