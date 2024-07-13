import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { Otp, otpSchema } from './schema/otp.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{name:Otp.name,schema:otpSchema}]),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
