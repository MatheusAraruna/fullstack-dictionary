import { Test, TestingModule } from '@nestjs/testing';
import { HealthcheckController } from '../../src/app/healthcheck/healthcheck.controller';
import { HealthcheckService } from '../../src/app/healthcheck/healthcheck.service';

describe('HealthcheckController', () => {
  let controller: HealthcheckController;
  let healthcheckService: any;

  const mockHealthResponse = {
    message: 'Fullstack Challenge 🏅 - Dictionary',
  };

  beforeEach(async () => {
    const mockHealthcheckService = {
      check: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthcheckController],
      providers: [
        {
          provide: HealthcheckService,
          useValue: mockHealthcheckService,
        },
      ],
    }).compile();

    controller = module.get<HealthcheckController>(HealthcheckController);
    healthcheckService = module.get(HealthcheckService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('check', () => {
    it('should return health check message', () => {
      // Arrange
      (healthcheckService.check as jest.Mock).mockReturnValue(
        mockHealthResponse,
      );

      const result = controller.check();

      expect(healthcheckService.check).toHaveBeenCalled();
      expect(result).toEqual(mockHealthResponse);
    });

    it('should handle service errors', () => {
      // Arrange
      const error = new Error('Service unavailable');
      (healthcheckService.check as jest.Mock).mockImplementation(() => {
        throw error;
      });

      expect(() => controller.check()).toThrow(error);
    });
  });
});
