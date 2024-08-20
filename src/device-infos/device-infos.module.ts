import { Module } from '@nestjs/common';
import { DeviceInfosService } from './device-infos.service';
import { DeviceInfosController } from './device-infos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DeviceInfos, deviceInfosSchema } from './schema/device.info.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
    MongooseModule.forFeature([{name:DeviceInfos.name,schema:deviceInfosSchema}]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRECT,
      signOptions: { expiresIn: "365d" },
    }),
  ],
  controllers: [DeviceInfosController],
  providers: [DeviceInfosService],
})
export class DeviceInfosModule {}
