import { Injectable } from '@nestjs/common';
import { CreateBloodRequestDto } from './dto/create-blood-request.dto';
import { UpdateBloodRequestDto } from './dto/update-blood-request.dto';
import { UserService } from 'src/user/user.service';
import { InjectModel } from '@nestjs/mongoose';
import { DeviceInfos } from 'src/device-infos/schema/device.info.schema';
import { Model, Types } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { Service } from 'src/common/service/service.common';
import { BloodRequest } from './schema/blood.request.schema';
import { QueryBloodDto } from './dto/query-blood.dto';


@Injectable()
export class BloodRequestService extends Service<BloodRequest> {

  constructor(
    private readonly userService: UserService,
    @InjectModel(BloodRequest.name) private bloodModel: Model<BloodRequest>,
    private jwtService: JwtService,) {
    super(bloodModel);
  }
  async create(id: Types.ObjectId, createBloodRequestDto: CreateBloodRequestDto,) {
    const user = await this.userService.findOneUser(id);
    const bloodRequest = {
      full_name: user['full_name'],
      user_id: user['_id'],
      phone_number: user['phone'],
      country_code: user['country_code'],
      email: user['email'],
      blood_group: user['blood_group'],
      request_blood_group: createBloodRequestDto.blood_group,
      hospital_name: createBloodRequestDto.hospital_name,
      contact_number: createBloodRequestDto.contact_number,
      location: { coordinates: [createBloodRequestDto.location.lng, createBloodRequestDto.location.lat] }
    }
    return await this.createOne(bloodRequest);
  }

  async findAll(queryBloodDto: QueryBloodDto) {
    const { page, limit, request_blood_group,lat,lng, ...restQuery } = queryBloodDto;

    if (request_blood_group) {
      restQuery['request_blood_group'] = request_blood_group;
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
    return await this.findByPaginateNear(restQuery,location, { page, limit });
  }

  async findAllIndividual(id: Types.ObjectId, queryBloodDto: QueryBloodDto) {
    const value = {
      user_id: id,
      page: queryBloodDto.page,
      limit: queryBloodDto.limit,
    }
    const { page, limit, ...restQuery } = value;
    return await this.findAllByQueryPagination(restQuery, { page, limit });
  }


  findOne(id: number) {
    return `This action returns a #${id} bloodRequest`;
  }

  update(id: number, updateBloodRequestDto: UpdateBloodRequestDto) {
    return `This action updates a #${id} bloodRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} bloodRequest`;
  }
}
