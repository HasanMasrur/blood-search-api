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
      phone_number: userDto.contact.phone
    });

    if (userData) {
      throw new BadRequestException("phone number allready used");
    }
    return await this.createOne(userDto);
  }
  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
