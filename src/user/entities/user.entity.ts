// import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
// import mongoose from "mongoose";
// import { CommonSchema } from "src/common/schema.common";




// // contact info
// @Schema()
// class ContactInfo {
//     @Prop({ unique: true })
//     phone: string;

//     @Prop({ unique: true })
//     email: string;

//     @Prop()
//     full_name: string;

//     @Prop()
//     country_code: string;

//     @Prop()
//     date_of_birth: string;

//     @Prop()
//     gender: string;

//     @Prop()
//     blood_group: string;

//     @Prop()
//     password: string;
// }
// // const pointSchema = new mongoose.Schema({
// //     type: {
// //         type: String,
// //         enum: ['Point'],
// //         default: 'Point'
// //     },
// //     coordinates: {
// //         type: [Number],
// //         required: true
// //     }
// // });

// @Schema({ timestamps: true })
// export class User extends CommonSchema {

//     @Prop({ type: ContactInfo })
//     contact: ContactInfo;

//     // @Prop({
//     //     type: pointSchema,
//     //     required: true
//     // })
//     // location: any;

//     // @Prop()
//     // login_type: string;

//     // @Prop()
//     // fcm_token: string;

//     // @Prop()
//     // device_id: string;

// }


// export const userSchema = SchemaFactory.createForClass(User);