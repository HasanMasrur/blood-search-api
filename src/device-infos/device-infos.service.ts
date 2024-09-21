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
import { QueryBloodIndividulDto } from 'src/blood-request/dto/query-blood_individul.dto';
@Injectable()
export class DeviceInfosService extends Service<DeviceInfos> {

  constructor(
    private readonly userService: UserService,
    @InjectModel(DeviceInfos.name) private userModel: Model<DeviceInfos>,
    private jwtService: JwtService,) {
    super(userModel);
  }
  async create(createDeviceInfoDto: CreateDeviceInfoDto, id: Types.ObjectId) {
    const deviceInfo = await this.findOneByQuery({ device_id: createDeviceInfoDto.device_id, },);
    const user = await this.userService.findOneUser(id);
    console.log(user);
    const deviceinfo = {
      full_name: user.full_name,
      user_id: user.id,
      phone_number: user.phone,
      country_code: user.country_code,
      email: user.email,
      blood_group: user.blood_group,
      login_status: true,
      fcm_token: createDeviceInfoDto.fcm_token,
      device_id: createDeviceInfoDto.device_id,
      location: { coordinates: [createDeviceInfoDto.location.lng, createDeviceInfoDto.location.lat] }
    }
 
    if (!deviceInfo) {
      return await this.createOne(deviceinfo);
    } else {
      console.log("device",deviceInfo, "deviceinfo",deviceinfo);
      console.log(deviceInfo.id);
      return await this.updateById(deviceInfo.id, deviceinfo);

    }
  }


  async findAll(queryDeviceDto: QueryDeviceDto) {
    const { page, limit, blood_group, lat, lng, ...restQuery } = queryDeviceDto;
console.log(blood_group);
    if (blood_group) {
      // + symbol is a special character in URLs
      restQuery['blood_group'] = bloodGroupName(blood_group);
    }
    console.log(restQuery);
    const location = {
      $geoNear: {
        near: { type: "Point", coordinates: [+lng, +lat] },
        distanceField: "dist.calculated",
        maxDistance: 100,  // Specify max distance (in meters)
        spherical: true
      }
    };
    return await this.findByPaginateNear(restQuery, location, { page, limit });
  }

  async findAllIndividual(id: Types.ObjectId, queryBloodIndividulDto: QueryBloodIndividulDto) {
    const { page, limit,  _id, ...restQuery } = queryBloodIndividulDto;
   
    if(id){
      restQuery["user_id"] = id;
    }
    console.log(restQuery);
    return await this.findAllByQueryPagination(restQuery, { page, limit });
  }







  findOne(id: number) {
    return `This action returns a #${id} deviceInfo`;
  }

  async update(id: Types.ObjectId, updateDeviceInfoDto: UpdateDeviceInfoDto) {
    console.log("id : " + id);
    return await this.updateById(id, updateDeviceInfoDto);
  }

  async remove(id: Types.ObjectId,userId: Types.ObjectId, ) {
    return  await this.removeByQuery({_id:id})
  }
}


function bloodGroupName( value) {
  switch (value) {
    case 'O': 
      return 'O+';
    case 'B': 
      return 'B+';
    case 'A':
      return 'A+';
    case 'AB': 
      return 'A+';
    case 'O-': 
      return 'O-';
    case 'B-': 
      return 'B-';
    case 'A-': 
      return 'A-';
    case 'AB-': 
      return 'AB-';
    default:
      return ''
  }
  }
