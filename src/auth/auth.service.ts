import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOtpDto } from './dto/otp.dto';
import { Service } from 'src/common/service.common';
import { Otp } from './schema/otp.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OtpVerifyDto } from './dto/otpVerify.dto';
import { UserService } from 'src/user/user.service';
import { UserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService extends Service<Otp> {

    constructor(
        private readonly userService: UserService,
        @InjectModel(Otp.name) OtpModel: Model<Otp>) {
        super(OtpModel);
    }

    async otpCreate(createOtpDto: CreateOtpDto) {
        const user = await this.findAllByQuery({ phone_number: createOtpDto.phone_number, });
        const otp_code = Math.floor(100000 + Math.random() * 900000);
        if (!user || !user.length) {
            const modifiedDto = {
                ...createOtpDto, otp_code: otp_code, time_limit: Date.now(), attempt_at: 1,
                location: { coordinates: [createOtpDto.location.lng, createOtpDto.location.lat] }
            }
            return await this.createOne(modifiedDto);
        } else {
            if (user[0].attempt_at <=10) {
                const updateOtp = {
                    otp_code: otp_code,
                    time_limit: Date.now(),
                    attempt_at: user[0].attempt_at + 1,
                    fcm_token: createOtpDto.fcm_token,
                    app_key: createOtpDto.app_key,
                    device_id: createOtpDto.device_id,
                    location: { coordinates: [createOtpDto.location.lng, createOtpDto.location.lat] }
                }
                return await this.updateById(user[0]._id, updateOtp);
            } else {
                throw new BadRequestException('User attemp limit already exist');
            }

        }
       
    }
    async otpVerify(otpVerifyDto: OtpVerifyDto) {
        const otp = await this.findAllByQuery({ phone_number: otpVerifyDto.phone_number, otp_code: otpVerifyDto.otp_code });
        if (otp.length > 0) {
  
           
         
            const userDto = {
                 fcm_token: otp[0].fcm_token,
                 app_key: otp[0].app_key,
                 device_id: otp[0].device_id,
                 login_type: "normal",
                 contact:
                 {
                     phone:otp[0].phone_number,
                     country_code:otp[0].country_code,
                  
                     fullName:null,
                 },
                 location:otp[0].location};
                 
          const user = await   this.userService.create(userDto);
          console.log("user"+user);
          return user;
        } else {
            return {
                "message": "The OTP you entered is incorrect. Please try again"
            };
        }
  
    }
}
