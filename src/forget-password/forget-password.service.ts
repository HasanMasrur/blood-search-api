import { Injectable } from '@nestjs/common';
import { CreateForgetPasswordDto } from './dto/create-forget-password.dto';
import { UpdateForgetPasswordDto } from './dto/update-forget-password.dto';

@Injectable()
export class ForgetPasswordService {
  create(createForgetPasswordDto: CreateForgetPasswordDto) {
    return 'This action adds a new forgetPassword';
  }

  findAll() {
    return `This action returns all forgetPassword`;
  }

  findOne(id: number) {
    return `This action returns a #${id} forgetPassword`;
  }

  update(id: number, updateForgetPasswordDto: UpdateForgetPasswordDto) {
    return `This action updates a #${id} forgetPassword`;
  }

  remove(id: number) {
    return `This action removes a #${id} forgetPassword`;
  }
}
