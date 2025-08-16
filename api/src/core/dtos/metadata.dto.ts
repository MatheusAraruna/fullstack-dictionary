import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmptyObject, IsOptional } from 'class-validator';
import { UserMetadata } from 'src/providers/auth/auth.types';

export class MetadataDto {
  @ApiProperty({
    description: 'The logged user in request.',
    required: false,
  })
  @IsOptional()
  @IsNotEmptyObject()
  loggedUser?: Pick<UserMetadata, 'id' | 'name' | 'email'>;
}
