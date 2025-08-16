import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { MetadataDto } from 'src/core/dtos/metadata.dto';

export class FavoriteDto extends MetadataDto {
  @ApiProperty()
  @IsString()
  word: string;
}
