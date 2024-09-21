import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IPaginate } from 'src/common/dto/common.dto';

export class QueryBloodIndividulDto extends IPaginate {

  @IsOptional()
  @IsString()
  _id:String;
  
  @IsOptional()
  @IsString()
  request_blood_group:String;
}
