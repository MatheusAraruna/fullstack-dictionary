import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetWordDto {
  @ApiProperty()
  @IsString()
  word: string;
}
