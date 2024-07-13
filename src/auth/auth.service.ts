import { Injectable } from '@nestjs/common';
import { CreateOtpDto } from './dto/auth.dto';
import { Service } from 'src/common/service.common';
import { Otp } from './schema/otp.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService extends Service<Otp> {

    constructor (@InjectModel(Otp.name) OtpModel:Model<Otp>){
        super(OtpModel);
    }

    async otpCreate(createOtpDto: CreateOtpDto) {

        const otp_code = Math.floor(100000 + Math.random() * 900000);
        const modifiedDto = {
            ...createOtpDto, otp_code: otp_code, time_limit: Date.now(), attempt_at: 1,
            location: { coordinates: [createOtpDto.location.lng, createOtpDto.location.lat] }
        }
        return await this.createOne(modifiedDto);
    }
    async otpVerify() {

    }
}
