import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpException, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { UserLogingDto } from './dto/user-loging.dto';
import { AuthGuard } from './auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('login')
  create(@Body() UserLogingDto: UserLogingDto) {
    return this.userService.signIn(UserLogingDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
  //  return this.userService.findOne(+id);
  }


  // update user profile
  @Patch('profile')
  @UseGuards(AuthGuard)
  async updateProfile(@Req() req: Request, @Body() updateUserDto: UpdateUserDto,) {
    try {
      console.log(req["user"]["_id"]);
      const data = await this.userService.update(req["user"]["_id"], updateUserDto);
      console.log(data);
      return {
        success: true,
        data,

      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
