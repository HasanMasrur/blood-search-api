import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";


export class CreateOtpDto {
    @IsNotEmpty()
    @IsString()
    app_key: string;

    @IsNotEmpty()
    @IsString()
    full_name: string;

    @IsNotEmpty()
    @IsString()
    country_code: string;

    @IsNotEmpty()
    @IsString()
    phone_number: string;

    @IsNotEmpty()
    @IsString()
    gender: string;
    
    @IsNotEmpty()
    @IsString()
    blood_group: string;

    @IsNotEmpty()
    @IsString()
    date_of_birth: string;


}
