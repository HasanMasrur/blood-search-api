import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './otp/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { DeviceInfoModule } from './device-info/device-info.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:'.env'
    }),
    MongooseModule.forRoot(process.env.DB_URL),
    AuthModule,
    UserModule,
    DeviceInfoModule
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
