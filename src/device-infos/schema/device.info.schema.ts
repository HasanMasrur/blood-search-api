
export class CreateDeviceInfoDto { }
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { CommonSchema } from "src/common/schema.common";

const pointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
    },
    coordinates: {
        type: [Number],
        required: true
    }
});

@Schema({ timestamps: true })
export class DeviceInfos extends CommonSchema {

    @Prop({
        type: pointSchema,
        required: true
    })
    location: any;

    @Prop()
    fcm_token: string;

    @Prop()
    login_status: boolean;

    @Prop()
    device_id: string;

}


export const deviceInfosSchema = SchemaFactory.createForClass(DeviceInfos);