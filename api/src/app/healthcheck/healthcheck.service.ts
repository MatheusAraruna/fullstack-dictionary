import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthcheckService {
  check() {
    return { message: 'Fullstack Challenge 🏅 - Dictionary' };
  }
}
