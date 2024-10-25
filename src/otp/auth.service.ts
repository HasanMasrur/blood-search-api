import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { CreateOtpDto } from './dto/otp.dto';
import { Service } from 'src/common/service/service.common';
import { Otp } from './schema/otp.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OtpVerifyDto } from './dto/otpVerify.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { ForgetPasswrodOtpDto } from './dto/forgetpassword.otp';
import { ForgetPasswordOtp } from './schema/forget.passwort.otp.schema';
import axios from 'axios';
@Injectable()
export class AuthService extends Service<Otp> {

    constructor(
        private readonly userService: UserService,
        @InjectModel(Otp.name) OtpModel: Model<Otp>,
        private JwtService: JwtService) {
        super(OtpModel);
    }
   

    async otpCreate(createOtpDto: CreateOtpDto) {
        const userData = await this.userService.findByPhone(createOtpDto.phone_number);
        if (!userData) {
            const user = await this.findAllByQuery({ phone_number: createOtpDto.phone_number, });
            const otp_code = Math.floor(100000 + Math.random() * 900000);
            if (!user || !user.length) {
                const salt = await bcrypt.genSalt();
                const hash = await bcrypt.hash(createOtpDto.password, salt);
                console.log(hash);
                const modifiedDto = {
                    ...createOtpDto, password: hash, otp_code: otp_code, time_limit: Date.now(), attempt_at: 1,
                }
                console.log("url is :::"+process.env.DB_URL);
                try {
                    const response = await axios.get(process.env.apiUrl, {
                      params: {
                        api_key: process.env.apiKey,
                        type: 'text',
                        number: createOtpDto.country_code+createOtpDto.phone_number,
                        senderid: process.env.senderId,
                        message: `Your OTP code is: ${otp_code}\n<#> ${createOtpDto.app_key}`
                      },
                    });
                    console.log('SMS sent successfully:', response.data);
                    //return response.data;
                    return await this.createOne(modifiedDto);
                  } catch (error) {
                    throw new HttpException(error.message, error.status);
                  }

              
            } else {
                const salt = await bcrypt.genSalt();
                const hash = await bcrypt.hash(createOtpDto.password, salt);
                console.log(hash);
                if (user[0].attempt_at <= 10) {
                    const updateOtp = {
                        otp_code: otp_code,
                        time_limit: Date.now(),
                        attempt_at: user[0].attempt_at + 1,
                        app_key: createOtpDto.app_key,
                        full_name: createOtpDto.full_name,
                        gender: createOtpDto.gender,
                        date_of_birth: createOtpDto.date_of_birth,
                        blood_group: createOtpDto.blood_group,
                        password: hash,
                    }
                    console.log("url is :::"+process.env.apiUrl);
                    try {
                        const response = await axios.get(process.env.apiUrl , {
                          params: {
                            api_key: process.env.apiKey,
                            type: 'text',
                            number: '0'+createOtpDto.phone_number,
                            senderid: process.env.senderId,
                            message: `Your OTP code is: ${otp_code}\n<#> ${createOtpDto.app_key}`
                          },
                        });
                        console.log('SMS sent successfully:', response.data);
                        //return response.data;
                        return await this.updateById(user[0]._id, updateOtp);
                      } catch (error) {
                        console.log(error);
                        throw new HttpException(error.message, error.status);
                      }
                } else {
                    throw new BadRequestException('User attemp limit already exist');
                }
            }
        } else {
              throw new BadRequestException('Phone Number allready Register');
        }
    }

    async otpVerify(otpVerifyDto: OtpVerifyDto) {
        const otp = await this.findAllByQuery({ phone_number: otpVerifyDto.phone_number, otp_code: otpVerifyDto.otp_code });
        if (otp.length > 0) {
            const userData = await this.userService.findByPhone(otp[0].phone_number);

            console.log("UserData ::: " + userData);
            if (!userData) {

                console.log("ok");
                const userDto = {
                    phone: otp[0].phone_number,
                    country_code: otp[0].country_code,
                    full_name: otp[0].full_name,
                    gender: otp[0].gender,
                    date_of_birth: otp[0].date_of_birth,
                    blood_group: otp[0].blood_group,
                    password: otp[0].password,
                };
                const user = await this.userService.create(userDto);
                console.log("user" + user);
                const token = await this.JwtService.signAsync(
                    { _id: user.id },
                    { secret: process.env.JWT_SECRECT }
                );
                return { "accessToken": token, data: user };
            } else {
                console.log("user" + userData);
                const token = await this.JwtService.signAsync(
                    { _id: userData.id },
                    { secret: process.env.JWT_SECRECT }
                );
                return { "accessToken": token, data: userData };
            }
            ;
        } else {
            throw new BadRequestException('The OTP you entered is incorrect. Please try again');
        }

    }

    async forgetPasswordOtp(forgetPasswrodOtpDto: ForgetPasswrodOtpDto) {
        const userData = await this.userService.findByPhone(forgetPasswrodOtpDto.phone_number);
        if (!userData) {
            const user = await this.findAllByQuery({ phone_number: forgetPasswrodOtpDto.phone_number, });
            const otp_code = Math.floor(100000 + Math.random() * 900000);
            if (!user || !user.length) {

                const modifiedDto = {
                    ...forgetPasswrodOtpDto, otp_code: otp_code, time_limit: Date.now(), attempt_at: 1,
                }
                return await this.createOne(modifiedDto);
            } else {
             
                if (user[0].attempt_at <= 10) {
                    const updateOtp = {
                        otp_code: otp_code,
                        time_limit: Date.now(),
                        attempt_at: user[0].attempt_at + 1,
                        app_key: forgetPasswrodOtpDto.app_key,
                    }
                    return await this.updateById(user[0]._id, updateOtp);
                } else {
                    throw new BadRequestException('User attemp limit already exist');
                }
            }
        } else {
              throw new BadRequestException('User Not found !');
        }
    }

}
