import { HttpException, HttpStatus } from '@nestjs/common';

export function AppException(message: string, status: HttpStatus) {
  return new HttpException(message, status);
}
