import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, HttpException, Query, Type } from '@nestjs/common';
import { DeviceInfosService } from './device-infos.service';
import { CreateDeviceInfoDto } from './dto/create-device-info.dto';
import { UpdateDeviceInfoDto } from './dto/update-device-info.dto';
import { AuthGuard } from 'src/user/auth.guard';
import { UserService } from 'src/user/user.service';
import { QueryDeviceDto } from './dto/query-user.dto';
import { MongoIdParams } from 'src/common/dto/common.dto';
import { QueryBloodIndividulDto } from 'src/blood-request/dto/query-blood_individul.dto';
import { Types } from 'mongoose';
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

  @Get('individual')
  @UseGuards(AuthGuard)
async    findAllIndividual(@Req() req: Request,@Query() queryBloodIndividulDto:QueryBloodIndividulDto) {
    try {
      console.log(req["user"]["_id"]);
      return await this.deviceInfosService.findAllIndividual( req['user']['_id'],queryBloodIndividulDto);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
   
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deviceInfosService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async update(  @Param() { id }: MongoIdParams, @Req() req: Request, @Body() updateDeviceInfoDto: UpdateDeviceInfoDto) {
    try {
      console.log(updateDeviceInfoDto);
    console.log(id);
    return this.deviceInfosService.update(id,updateDeviceInfoDto);
    } catch (error) {
      throw error;
    }
  }


  @Delete(':id')
  @UseGuards(AuthGuard)
  remove( @Req() req: Request , @Param('id') id: Types.ObjectId,) {
    try {
      console.log('id is ',id);
      console.log(req["user"]["_id"]);
      return this.deviceInfosService.remove(id,req["user"]["_id"]);
    } catch (error) {
      throw error;
    }
  }}
