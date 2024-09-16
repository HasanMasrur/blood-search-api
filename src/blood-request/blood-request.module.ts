import { Module } from '@nestjs/common';
import { BloodRequestService } from './blood-request.service';
import { BloodRequestController } from './blood-request.controller';
import { UserModule } from 'src/user/user.module';
import { BloodRequest , BloodRequestSchema} from './schema/blood.request.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

@Module({
imports:[
UserModule,
MongooseModule.forFeature([{name:BloodRequest.name,schema:BloodRequestSchema}]),
JwtModule.register({
  global:true,
  secret: process.env.JWT_SECRECT,
  signOptions: { expiresIn: "365d" },
})
],
  controllers: [BloodRequestController],
  providers: [BloodRequestService],
})
export class BloodRequestModule {}
