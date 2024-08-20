import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import mongoose from "mongoose";
import { CommonSchema } from "src/common/schema.common";
import { DeviceInfo } from "./device-info.schema";

// contact info


@Schema({ timestamps: true })
export class User extends CommonSchema {
    
    @Prop({ unique: true })
    phone: string;
    @Prop()
    email?: string;
    @Prop()
    full_name: string;

    @Prop()
    country_code: string;

    @Prop()
    address: string;

    @Prop()
    date_of_birth: string;

    @Prop()
    gender: string;

    @Prop()
    blood_group: string;

    @Prop()
    password:string;

    @Prop({ type: [DeviceInfo] })
    delivery_addresses: DeviceInfo[];

}


export const userSchema = SchemaFactory.createForClass(User);