import { BadRequestException, Body, Injectable, NotFoundException, Type } from '@nestjs/common';
import { UserDto } from './dto/create-user.dto';
import { Service } from "src/common/service/service.common";

import { Model, Types } from 'mongoose';
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from '@nestjs/mongoose';
import { UserLogingDto } from './dto/user-loging.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schema/user.schema';
@Injectable()
export class UserService extends Service<User>{
  
  constructor(@InjectModel(User.name) private userModel: Model<User>, 
  private jwtService: JwtService,) {
    super(userModel);
  }
  async create(@Body()  userDto: UserDto) {
    const userData = await this.findOneByQuery({
      phone: userDto.phone
    });
    if (userData) {
      throw new BadRequestException("Phone number allready used");
    }
    return await this.createOne(userDto);
  }
 

  async signIn(@Body()  UserLogingDto: UserLogingDto) {
    console.log(UserLogingDto);
    const userData = await this.findAllByQuery({
      phone: UserLogingDto.phone,
    });

    console.log("userdata: ",userData);
    if (userData) {
     console.log(userData[0]?.full_name);
     console.log(UserLogingDto.password);
      const isMatch = await bcrypt.compare( UserLogingDto.password,userData[0]?.password,);
      if (isMatch) {
        const token = await this.jwtService.signAsync(
          { _id:userData[0]._id },
          { secret: process.env.JWT_SECRECT }
        );

        return {"accessToken":token,data:userData};
      } else {
        return { message: 'Invalid credentials.' };
      }
    }else {
      throw new BadRequestException("Incorrect username or password .");
    }

  }


  async update(id: Types.ObjectId, updateUserDto: UpdateUserDto) {
    console.log("id : "+id);
    return await this.updateById(id, updateUserDto);
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

 async findOneUser(id: Types.ObjectId) {
    const userData = await this.findOneById(id);
    if(!userData){
      throw new NotFoundException('user not found');
    }
     return userData;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
