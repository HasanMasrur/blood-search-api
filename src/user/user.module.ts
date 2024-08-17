import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { User, userSchema } from './schema/user.schema';
import { JwtModule, JwtService } from "@nestjs/jwt";
@Module({
  imports:[
    MongooseModule.forFeature([{name:User.name,schema:userSchema}]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRECT,
      signOptions: { expiresIn: "365d" },
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
