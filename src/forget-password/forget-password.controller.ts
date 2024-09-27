import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ForgetPasswordService } from './forget-password.service';
import { CreateForgetPasswordDto } from './dto/create-forget-password.dto';
import { UpdateForgetPasswordDto } from './dto/update-forget-password.dto';

@Controller('forget-password')
export class ForgetPasswordController {
  constructor(private readonly forgetPasswordService: ForgetPasswordService) {}

  @Post()
  create(@Body() createForgetPasswordDto: CreateForgetPasswordDto) {
    return this.forgetPasswordService.create(createForgetPasswordDto);
  }

  @Get()
  findAll() {
    return this.forgetPasswordService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.forgetPasswordService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateForgetPasswordDto: UpdateForgetPasswordDto) {
    return this.forgetPasswordService.update(+id, updateForgetPasswordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.forgetPasswordService.remove(+id);
  }
}
