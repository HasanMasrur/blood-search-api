import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './otp/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { DeviceInfosModule } from './device-infos/device-infos.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:'.env'
    }),
    MongooseModule.forRoot(process.env.DB_URL),
    AuthModule,
    UserModule,
    DeviceInfosModule
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
