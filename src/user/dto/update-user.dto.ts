import { PartialType } from '@nestjs/swagger';
import { UserDto } from './create-user.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateUserDto extends PartialType(UserDto) {
  
}
