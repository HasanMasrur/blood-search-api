import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { BloodGroupTypeEnum } from "../blood-group-type_enum";


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
    @IsEnum(BloodGroupTypeEnum)
    blood_group: BloodGroupTypeEnum;

    @IsNotEmpty()
    @IsString()
    hospital_name: string;
    
    @IsOptional()
    @IsString()
    message: string;

    @IsNotEmpty()
    @IsString()
    contact_number: string;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => ILocation)
    location: ILocation;
}




