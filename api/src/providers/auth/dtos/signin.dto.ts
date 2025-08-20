import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SigninDto {
  @ApiProperty({
    description: 'User email',
    required: true,
    type: String,
    example: 'user@example.com',
  })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    description: 'User password',
    required: true,
    type: String,
    example: 'password123',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
