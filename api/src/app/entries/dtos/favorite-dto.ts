import { ApiProperty, ApiExtraModels } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { MetadataDto } from 'src/core/dtos/metadata.dto';

@ApiExtraModels(MetadataDto)
export class FavoriteDto extends MetadataDto {
  @ApiProperty({
    description:
      'The word that is marked as favorite. This should be a valid dictionary entry and is case-insensitive.',
    example: 'serendipity',
    type: String,
    minLength: 1,
    maxLength: 100,
    required: true,
  })
  @IsString()
  word: string;
}
