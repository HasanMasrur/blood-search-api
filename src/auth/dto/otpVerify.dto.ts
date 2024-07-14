import { IsNotEmpty, IsNumber, IsString, isNotEmpty } from "class-validator"
import { Type } from "class-transformer";


export class OtpVerifyDto {
    @IsNotEmpty()
    @IsString()
    phone_number: string;
    @IsNotEmpty()
    @IsNumber()
    otp_code: number;
}