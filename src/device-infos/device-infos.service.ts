import { Injectable } from '@nestjs/common';
import { CreateDeviceInfoDto } from './dto/create-device-info.dto';
import { UpdateDeviceInfoDto } from './dto/update-device-info.dto';
import { Service } from 'src/common/service/service.common';
import { DeviceInfos } from './schema/device.info.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from "@nestjs/jwt";
import { UserService } from 'src/user/user.service';
import { QueryDeviceDto } from './dto/query-user.dto';
@Injectable()
export class DeviceInfosService extends Service<DeviceInfos> {

  constructor(
    private readonly userService: UserService,
    @InjectModel(DeviceInfos.name) private userModel: Model<DeviceInfos>,
    private jwtService: JwtService,) {
    super(userModel);
  }
  async create(createDeviceInfoDto: CreateDeviceInfoDto, id: Types.ObjectId) {
    const deviceInfo = await this.findAllByQuery({ device_id: createDeviceInfoDto.device_id, },);
    const user = await this.userService.findOneUser(id);
    console.log(user);
    const deviceinfo = {
      full_name: user['full_name'],
      user_id: user['_id'],
      phone_number: user['phone'],
      country_code: user['country_code'],
      email: user['email'],
      blood_group: user['blood_group'],
      login_status: createDeviceInfoDto.login_status,
      fcm_token: createDeviceInfoDto.fcm_token,
      device_id: createDeviceInfoDto.device_id,
      location: { coordinates: [createDeviceInfoDto.location.lng, createDeviceInfoDto.location.lat] }
    }
    if (!deviceInfo || !deviceInfo.length) {
      return await this.createOne(deviceinfo);
    } else {
      console.log(deviceInfo[0]['_id']);
      return await this.updateById(deviceInfo[0]['_id'], deviceinfo);

    }
  }

  async findAll(queryDeviceDto: QueryDeviceDto) {
    const value = {
      lng: +queryDeviceDto.lng,
      lat:+queryDeviceDto.lat,
      page: queryDeviceDto.page,
      limit: queryDeviceDto.limit,
    }
    const { page, limit, ...restQuery } = value;
    return await this.findByPaginateNear(restQuery, { page, limit });
  }

  findOne(id: number) {
    return `This action returns a #${id} deviceInfo`;
  }

  async update(id: Types.ObjectId, updateDeviceInfoDto: UpdateDeviceInfoDto) {
    console.log("id : " + id);
    return await this.updateById(id, updateDeviceInfoDto);
  }

  remove(id: number) {
    return `This action removes a #${id} deviceInfo`;
  }
}
