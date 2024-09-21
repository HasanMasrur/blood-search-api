import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IPaginate } from 'src/common/dto/common.dto';

export class QueryBloodDto extends IPaginate {

  @IsOptional()
  @IsString()
  _id:String;
  
  @IsNotEmpty()
  @IsString()
  lat: string;

  @IsNotEmpty()
  @IsString()
  lng: string;

  @IsOptional()
  @IsString()
  request_blood_group:String;
}
