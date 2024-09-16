
export class CreateDeviceInfoDto { }
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";


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
export class BloodRequest {

    @Prop()
    country_code: string;

    @Prop()
    full_name: string;
    @Prop()
    user_id: string;

    @Prop()
    phone_number: string;

    @Prop()
    email: String;

    @Prop()
    blood_group: string;

    @Prop({
        type: pointSchema,
        required: true
    })
    location: any;

    @Prop()
    request_blood_group: string;

    @Prop()
    hospital_name: string;

    @Prop()
    contact_number: string;

}


export const BloodRequestSchema = SchemaFactory.createForClass(BloodRequest);