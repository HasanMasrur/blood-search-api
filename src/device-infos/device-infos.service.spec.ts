import { Test, TestingModule } from '@nestjs/testing';
import { DeviceInfosService } from './device-infos.service';

describe('DeviceInfosService', () => {
  let service: DeviceInfosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeviceInfosService],
    }).compile();

    service = module.get<DeviceInfosService>(DeviceInfosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
