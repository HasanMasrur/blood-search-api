import { Injectable } from '@nestjs/common';
import { CreateDeviceInfoDto } from './dto/create-device-info.dto';
import { UpdateDeviceInfoDto } from './dto/update-device-info.dto';
import { Service } from 'src/common/service.common';
import { DeviceInfos } from './schema/device.info.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class DeviceInfosService extends Service<DeviceInfos> {

  constructor(@InjectModel(DeviceInfos.name) private userModel: Model<DeviceInfos>, 
  private jwtService: JwtService,) {
    super(userModel);
  }
 async create(createDeviceInfoDto: CreateDeviceInfoDto) {


    const deviceInfo = await this.findAllByQuery({ device_id: createDeviceInfoDto.device_id, });
  
  if(!deviceInfo ||!deviceInfo.length){
    const deviceinfo = {
     
      login_status:createDeviceInfoDto.login_status,
      fcm_token:createDeviceInfoDto.fcm_token,
  
      device_id: createDeviceInfoDto.device_id,
      location: { coordinates: [createDeviceInfoDto.location.lng, createDeviceInfoDto.location.lat] }
    }
    return await this.createOne(deviceinfo);
  }else{

   
  }
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
