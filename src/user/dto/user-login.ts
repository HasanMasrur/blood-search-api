
import { IsEmail, IsEmpty, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength, ValidateNested, isNotEmpty, isString } from "class-validator";



export class LoginUser {

    @IsNotEmpty()
    @IsString()
    phone: String;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: String;

}

