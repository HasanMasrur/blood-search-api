
import { IsEmail, IsEmpty, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength, ValidateNested, isNotEmpty, isString } from "class-validator";



export class UserLogingDto {

    @IsNotEmpty()
    @IsString()
    phone: String;
    

    @IsNotEmpty()
    @IsString()
    country_code: String;
    
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: String;

}

