import { PartialType } from '@nestjs/swagger';
import { CreateDeviceInfoDto } from './create-device-info.dto';

export class UpdateDeviceInfoDto extends PartialType(CreateDeviceInfoDto) {}
