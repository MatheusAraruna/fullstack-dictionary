import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmptyObject, IsOptional } from 'class-validator';
import { UserMetadata } from 'src/providers/auth/auth.types';

export class MetadataDto {
  @ApiProperty({
    description: 'The logged user in request.',
    required: false,
    type: Object,
    example: {
      id: 'user-123',
      name: 'John Doe',
      email: 'john@example.com',
    },
  })
  @IsOptional()
  @IsNotEmptyObject()
  loggedUser?: Pick<UserMetadata, 'id' | 'name' | 'email'>;
}
