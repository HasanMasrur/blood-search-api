import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsNumber, IsObject, IsString, ValidateNested } from "class-validator";


export class ILocation {
    @IsNotEmpty()
    @IsNumber()
    lat: number;

    @IsNotEmpty()
    @IsNumber()
    lng: number;
}

export class CreateBloodRequestDto {
    @IsNotEmpty()
    @IsString()
    blood_group: string;

    @IsNotEmpty()
    @IsString()
    hospital_name: string;

    @IsNotEmpty()
    @IsString()
    contact_number: string;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => ILocation)
    location: ILocation;
}




