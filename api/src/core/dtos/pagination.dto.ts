import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumber, IsOptional } from 'class-validator';
import { MetadataDto } from './metadata.dto';

export class PaginationDto extends MetadataDto {
  @ApiProperty({
    description:
      'Número máximo de itens a serem retornados na resposta da requisição.',
    required: false,
    type: Number,
    example: 20,
  })
  @IsNumber()
  @IsOptional()
  limit?: number;

  @ApiProperty({
    description: 'Número da página a ser retornada na resposta da requisição.',
    required: false,
    type: Number,
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiProperty({
    description: 'Orientação da ordenação dos resultados.',
    required: false,
    enum: ['asc', 'desc'],
    example: 'asc',
  })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  orientation?: 'asc' | 'desc' = 'asc';
}
