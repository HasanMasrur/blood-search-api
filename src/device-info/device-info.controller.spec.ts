import { Test, TestingModule } from '@nestjs/testing';
import { DeviceInfoController } from './device-info.controller';
import { DeviceInfoService } from './device-info.service';

describe('DeviceInfoController', () => {
  let controller: DeviceInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeviceInfoController],
      providers: [DeviceInfoService],
    }).compile();

    controller = module.get<DeviceInfoController>(DeviceInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
