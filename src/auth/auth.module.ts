import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { Otp, otpSchema } from './schema/otp.schema';
import { UserModule } from 'src/user/user.module';

@Module({

  imports:[
    UserModule,
    MongooseModule.forFeature([{name:Otp.name,schema:otpSchema}]),
  ],
  controllers: [AuthController],
  providers: [AuthService,]
})
export class AuthModule {}
