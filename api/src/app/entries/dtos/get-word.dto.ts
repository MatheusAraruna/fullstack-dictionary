import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { MetadataDto } from 'src/core/dtos/metadata.dto';

export class GetWordDto extends MetadataDto {
  @ApiProperty({
    description: 'Word to retrieve',
    required: true,
    type: String,
    example: 'example',
  })
  @IsString()
  word: string;
}
