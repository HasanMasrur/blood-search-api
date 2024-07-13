import { Body, Controller, Post,Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateOtpDto } from './dto/auth.dto';
import { log } from 'console';

@Controller('auth')
export class AuthController {
    constructor (private readonly AuthService:AuthService){
    }
    @Post("send-otp")
    async create(@Body() CreateOtpDto :CreateOtpDto){
        console.log(CreateOtpDto);
const data = await this.AuthService.otpCreate(CreateOtpDto);
return data;
    }

@Get()
async get(){
   
  return "auth get call !";
}

}
