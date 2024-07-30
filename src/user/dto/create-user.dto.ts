import { Optional } from "@nestjs/common";
import { Type } from "class-transformer";
import { IsEmail, IsEmpty, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested, isNotEmpty } from "class-validator";


export class ILocation {
    @IsNotEmpty()
    @IsNumber()
    lat: number;

    @IsNotEmpty()
    @IsNumber()
    lng: number;
}


export class ContactInfo {
    @IsOptional()
    @IsString()
    fullName: string;



    @IsOptional()
    @IsString()
    phone: String;

    @IsOptional()
    @IsString()
    country_code: String;
}
export class UserDto {


    @IsNotEmpty()
    @IsString()
    fcm_token: string;

    @IsNotEmpty()
    @IsString()
    app_key: string;

    @IsNotEmpty()
    @IsString()
    device_id: string;

    @IsNotEmpty()
    @IsString()
    login_type: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => ContactInfo)
    contact: ContactInfo;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => ILocation)
    location: ILocation;

}

export class UserLoginDto {
    @IsNotEmpty()
    @IsString()
    User_id: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}
