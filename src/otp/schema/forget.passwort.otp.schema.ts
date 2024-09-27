import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({ timestamps: true })
export class ForgetPasswordOtp {
    
    @Prop({required:true})
    app_key: string;

    @Prop({required:true})
    country_code: string;

    @Prop({required:true})
    phone_number: string;

    @Prop({required:true})
    otp_code: string;

    @Prop({required:true})
    attempt_at: number;
   
}

export const forgetPasswordOtpSchema = SchemaFactory.createForClass(ForgetPasswordOtp);
