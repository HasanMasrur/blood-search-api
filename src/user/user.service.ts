import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { UserDto } from './dto/create-user.dto';
import { Service } from "src/common/service.common";
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class UserService extends Service<User>{
  constructor(@InjectModel(User.name) private userModel: Model<User>) {
    super(userModel);
  }
  async create(@Body()  userDto: UserDto) {
    const userData = await this.findOneByQuery({
      phone: userDto.phone
    });

    if (userData) {
      throw new BadRequestException("phone number allready used");
    }
    return await this.createOne(userDto);
  }
  findAll() {
    return `This action returns all user`;
  }

 async findByPhone(phone_number: String) {

  console.log("number"+phone_number);
    const userData = await this.findOneByQuery({
     phone:phone_number,
    });
    // if (userData) {
    //   throw new BadRequestException("phone number allready used");
    // }
    return userData;
  }

  findOne(id: number) {
    return `This action removes a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
