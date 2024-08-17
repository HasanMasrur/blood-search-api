
import { IsEmail, IsEmpty, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested, isNotEmpty, isString } from "class-validator";



export class UserDto {

    @IsOptional()
    @IsString()
    full_name: string;

    @IsOptional()
    @IsString()
    phone: String;


    @IsOptional()
    @IsString()
    password: String;
    

    @IsOptional()
    @IsString()
    country_code: String;

    @IsOptional()
    @IsString()
    gender:String;

    @IsOptional()
    @IsString()
    blood_group:String;

    @IsOptional()
    @IsString()
    date_of_birth :String;

}

