import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";

export class ILocation {
    @IsNotEmpty()
    @IsNumber()
    lat: number;

    @IsNotEmpty()
    @IsNumber()
    lng: number;
}
export class CreateOtpDto {
    @IsNotEmpty()
    @IsString()
    app_key: string;

    @IsNotEmpty()
    @IsString()
    device_id: string;

    @IsNotEmpty()
    @IsString()
    country_code: string;

    @IsNotEmpty()
    @IsString()
    phone_number: string;

    @IsNotEmpty()
    @IsString()
    fcm_token: string;

    @IsNotEmpty()
    @IsString()
    login_type: string;
    
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => ILocation)
    location: ILocation;

}
