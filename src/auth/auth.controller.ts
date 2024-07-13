import { Body, Controller, Post,Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor (private readonly AuthService:AuthService){
    }
    @Post()
    async create(){
const data = await this.AuthService.otpCreate();
    }
    
@Get()
async get(){
    const data = await this.AuthService.otpCreate();
    return data;
}

}
