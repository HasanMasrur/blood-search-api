import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";


export class ForgetPasswrodOtpDto {
    @IsNotEmpty()
    @IsString()
    app_key: string;

    @IsNotEmpty()
    @IsString()
    country_code: string;

    @IsNotEmpty()
    @IsString()
    phone_number: string;


}
