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
export class Otp {
    @Prop({required:true})
    app_key: string;

    @Prop({required:true})
    device_id: string;

    @Prop({required:true})
    country_code: string;

    @Prop({required:true})
    phone_number: string;

    @Prop({required:true})
    otp_code: string;

    @Prop({required:true})
    fcm_token: string;

    @Prop({required:true})
    time_limit: string;
    
    @Prop({required:true})
    attempt_at: number;
    @Prop({
        type: pointSchema,
        required: true
    })
    location: any;
}

export const otpSchema = SchemaFactory.createForClass(Otp);
