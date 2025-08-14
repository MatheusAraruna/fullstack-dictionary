import { Controller, Get } from '@nestjs/common';
import { HealthcheckService } from './healthcheck.service';
import { Public } from 'src/providers/auth/decorators/public.decorator';

@Controller()
export class HealthcheckController {
  constructor(private readonly healthcheckService: HealthcheckService) {}

  @Public()
  @Get()
  check() {
    return this.healthcheckService.check();
  }
}
