import { Controller, Get } from '@nestjs/common';
import { HealthcheckService } from './healthcheck.service';
import { Public } from 'src/providers/auth/decorators/public.decorator';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Healthcheck')
@Controller()
export class HealthcheckController {
  constructor(private readonly healthcheckService: HealthcheckService) {}

  @ApiOperation({
    summary: 'Check API health status',
    description: 'Returns a simple message indicating the API is healthy.',
  })
  @ApiOkResponse({ description: 'API is healthy' })
  @ApiBadRequestResponse({ description: 'Internal server error' })
  @Public()
  @Get()
  check() {
    return this.healthcheckService.check();
  }
}
