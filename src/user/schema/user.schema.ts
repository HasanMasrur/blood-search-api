import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class User {
    
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

}


export const userSchema = SchemaFactory.createForClass(User);