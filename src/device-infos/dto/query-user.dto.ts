import { IsOptional, IsString } from 'class-validator';
import { IPaginate } from 'src/common/dto/common.dto';

export class QueryDeviceDto extends IPaginate {
  @IsOptional()
  @IsString()
  _id: string;

  @IsOptional()
  @IsString()
  search: string;
}
