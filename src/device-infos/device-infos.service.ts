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
    const deviceInfo = await this.findAllByQuery({ device_id: createDeviceInfoDto.device_id, });
    const user = await this.userService.findOneUser(id);
    console.log(user);
    if (!deviceInfo || !deviceInfo.length) {
      const deviceinfo = {
        full_name: user['full_name'],
        user_id: user['_id'],
        phone_number: user['phone_number'],
        country_code: user['country_code'],
        email: user['email'],
        blood_group: user['blood_group'],
        login_status: createDeviceInfoDto.login_status,
        fcm_token: createDeviceInfoDto.fcm_token,
        device_id: createDeviceInfoDto.device_id,
        location: { coordinates: [createDeviceInfoDto.location.lng, createDeviceInfoDto.location.lat] }
      }
      return await this.createOne(deviceinfo);
    } else {
      return deviceInfo;
    }
  }

  async findAll(QueryDeviceDto: QueryDeviceDto) {
    const { page, limit, ...restQuery } = QueryDeviceDto;
    return await this.findByPaginate(restQuery, { page, limit });
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
