import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, HttpException, Query } from '@nestjs/common';
import { DeviceInfosService } from './device-infos.service';
import { CreateDeviceInfoDto } from './dto/create-device-info.dto';
import { UpdateDeviceInfoDto } from './dto/update-device-info.dto';
import { AuthGuard } from 'src/user/auth.guard';
import { UserService } from 'src/user/user.service';
import { QueryDeviceDto } from './dto/query-user.dto';
@Controller('device-infos')
export class DeviceInfosController {
  constructor(private readonly deviceInfosService: DeviceInfosService, private readonly UserService: UserService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  async create(@Req() req: Request, @Body() createDeviceInfoDto: CreateDeviceInfoDto) {
    try {
      console.log(createDeviceInfoDto);
    console.log(req["user"]["_id"]);
    return this.deviceInfosService.create(createDeviceInfoDto,req["user"]["_id"]);
    } catch (error) {
      throw error;
    }
  }

  @Get()
async  findAll(@Query() QueryDeviceDto:QueryDeviceDto) {
    try {
      return await this.deviceInfosService.findAll(QueryDeviceDto);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
   
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
