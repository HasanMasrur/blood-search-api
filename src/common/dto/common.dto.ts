import {
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';

export class IPaginate {
  @IsOptional()
  @IsNumberString()
  limit?: number;

  @IsOptional()
  @IsNumberString()
  page?: number;
}

export class QueryCommonDto extends IPaginate {
  @IsOptional()
  @IsString()
  sortBy?: string;

  @IsOptional()
  @IsNumberString()
  sortOrder?: number;

  @IsOptional()
  @IsEnum({ true: 'true', one: '1', false: 'false', zero: '0' })
  is_active?: string;
}

export class MongoIdParams {
  @IsNotEmpty()
  @IsMongoId()
  id: Types.ObjectId;
}

export class IQueryCommon extends IPaginate {
  @IsOptional()
  @IsString()
  sortBy?: string;

  @IsOptional()
  @IsNumberString()
  sortOrder?: number;
}

export class UserRequest {
  @IsNotEmpty()
  @IsMongoId()
  _id: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
