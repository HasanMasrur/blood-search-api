import { Module } from '@nestjs/common';
import { DeviceInfosService } from './device-infos.service';
import { DeviceInfosController } from './device-infos.controller';

@Module({
  controllers: [DeviceInfosController],
  providers: [DeviceInfosService],
})
export class DeviceInfosModule {}
