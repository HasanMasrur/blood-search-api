import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { UserDto } from './dto/create-user.dto';
import { Service } from "src/common/service.common";
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserLogingDto } from './dto/user-loging.dto';
import * as bcrypt from 'bcrypt';
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
 

  async signIn(@Body()  UserLogingDto: UserLogingDto) {
    console.log(UserLogingDto);
    const userData = await this.findOneByQuery({
      phone: UserLogingDto.phone,
    });
    console.log("userdata"+userData);
    if (userData) {
     console.log(userData['password']);
      const isMatch = await bcrypt.compare( UserLogingDto.password,userData['password']);
      if (isMatch) {
        return userData;
      } else {
        return { message: 'Invalid credentials.' };
      }
    }else {
      throw new BadRequestException("Incorrect username or password .");
    }

  }

  findAll() {
    return `This action returns all user`;
  }

 async findByPhone(phone_number: String) {
  console.log("number"+phone_number);
    const userData = await this.findOneByQuery({
     phone:phone_number,
    });
    return userData;
  }

  findOne(id: number) {
    return `This action removes a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
