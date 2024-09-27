import { Body, Controller, Post, Get, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateOtpDto } from './dto/otp.dto';
import { OtpVerifyDto } from './dto/otpVerify.dto';
import { log } from 'console';
import { UserService } from 'src/user/user.service';



@Controller('auth')
export class AuthController {
    constructor(private readonly AuthService: AuthService, private readonly UserService: UserService) {
    }
    @Post("send-otp")
    async create(@Body() CreateOtpDto: CreateOtpDto) {
        try {
            console.log(CreateOtpDto);
            const data = await this.AuthService.otpCreate(CreateOtpDto);
            return data;
        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }

    @Post("otp-verify")
    async verify(@Body() OtpVerifyDto: OtpVerifyDto) {
        try {
            const otp = await this.AuthService.otpVerify(OtpVerifyDto);
            return otp;
        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }

    @Post("forget-password")
    async forgetPassword(@Body() CreateOtpDto: CreateOtpDto) {
        try {
            console.log(CreateOtpDto);
            const data = await this.AuthService.otpCreate(CreateOtpDto);
            return data;
        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }


    @Get()
    async get() {
        return "auth get call !";
    }

}
