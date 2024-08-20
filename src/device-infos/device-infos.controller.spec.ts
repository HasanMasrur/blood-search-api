import { Test, TestingModule } from '@nestjs/testing';
import { DeviceInfosController } from './device-infos.controller';
import { DeviceInfosService } from './device-infos.service';

describe('DeviceInfosController', () => {
  let controller: DeviceInfosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeviceInfosController],
      providers: [DeviceInfosService],
    }).compile();

    controller = module.get<DeviceInfosController>(DeviceInfosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
