import { Injectable } from '@nestjs/common';
import { CreateDeviceInfoDto } from './dto/create-device-info.dto';
import { UpdateDeviceInfoDto } from './dto/update-device-info.dto';

@Injectable()
export class DeviceInfosService {
  create(createDeviceInfoDto: CreateDeviceInfoDto) {
    return 'This action adds a new deviceInfo';
  }

  findAll() {
    return `This action returns all deviceInfos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} deviceInfo`;
  }

  update(id: number, updateDeviceInfoDto: UpdateDeviceInfoDto) {
    return `This action updates a #${id} deviceInfo`;
  }

  remove(id: number) {
    return `This action removes a #${id} deviceInfo`;
  }
}
