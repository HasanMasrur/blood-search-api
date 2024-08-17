import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

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

// @Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })


export class DeviceInfo {

  @Prop({
    type: pointSchema,
    required: true
  })
  location: any;

  @Prop()
  login_type: string;

  @Prop()
  fcm_token: string;

  @Prop()
  device_id: string;
  @Prop()
  isLogin: boolean;
}

export const DeviceInfoSchema =
  SchemaFactory.createForClass(DeviceInfo);
