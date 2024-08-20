import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeviceInfosService } from './device-infos.service';
import { CreateDeviceInfoDto } from './dto/create-device-info.dto';
import { UpdateDeviceInfoDto } from './dto/update-device-info.dto';

@Controller('device-infos')
export class DeviceInfosController {
  constructor(private readonly deviceInfosService: DeviceInfosService) {}

  @Post('create')
  async create(@Body() createDeviceInfoDto: CreateDeviceInfoDto) {
    console.log(createDeviceInfoDto);
    return this.deviceInfosService.create(createDeviceInfoDto);
  }

  @Get()
  findAll() {
    return this.deviceInfosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deviceInfosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeviceInfoDto: UpdateDeviceInfoDto) {
    return this.deviceInfosService.update(+id, updateDeviceInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deviceInfosService.remove(+id);
  }
}
