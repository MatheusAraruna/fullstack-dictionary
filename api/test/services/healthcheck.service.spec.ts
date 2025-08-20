import { Test, TestingModule } from '@nestjs/testing';
import { HealthcheckService } from '../../src/app/healthcheck/healthcheck.service';

describe('HealthcheckService', () => {
  let service: HealthcheckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HealthcheckService],
    }).compile();

    service = module.get<HealthcheckService>(HealthcheckService);
  });

  describe('check', () => {
    it('should return health check message', () => {
      const result = service.check();

      expect(result).toEqual({
        message: 'Fullstack Challenge 🏅 - Dictionary',
      });
    });

    it('should always return the same message format', () => {
      const result1 = service.check();
      const result2 = service.check();

      expect(result1).toEqual(result2);
      expect(result1).toHaveProperty('message');
      expect(typeof result1.message).toBe('string');
    });
  });
});
