import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({ timestamps: true })
export class Otp {
    @Prop({required:true})
    app_key: string;

    @Prop({required:true})
    gender: string;

    @Prop({required:true})
    country_code: string;
    @Prop({required:true})
    full_name: string;
    
    @Prop({required:true})
    phone_number: string;

    @Prop({required:true})
    otp_code: string;

    @Prop({required:true})
    blood_group: string;

    @Prop({required:true})
    time_limit: string;

    @Prop({required:true})
    date_of_birth: string;
    
    @Prop({required:true})
    attempt_at: number;
   
}

export const otpSchema = SchemaFactory.createForClass(Otp);
