import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query, HttpException, Type } from '@nestjs/common';
import { BloodRequestService } from './blood-request.service';
import { CreateBloodRequestDto } from './dto/create-blood-request.dto';
import { UpdateBloodRequestDto } from './dto/update-blood-request.dto';
import { AuthGuard } from 'src/user/auth.guard';
import { QueryBloodDto } from './dto/query-blood.dto';
import { QueryBloodIndividulDto } from './dto/query-blood_individul.dto';
import { Types } from 'mongoose';

@Controller('blood-request')
export class BloodRequestController {
  constructor(private readonly bloodRequestService: BloodRequestService) {}
  @Post('create')
  @UseGuards(AuthGuard)
  create(@Req() req: Request, @Body() createBloodRequestDto: CreateBloodRequestDto) {
    console.log(createBloodRequestDto);
    console.log(req["user"]["_id"]);
    return this.bloodRequestService.create(req['user']['_id'], createBloodRequestDto);
  }

 

  @Get()
  @UseGuards(AuthGuard)
async  findAll(@Query() queryBloodDto:QueryBloodDto) {
    try {
      return await this.bloodRequestService.findAll(queryBloodDto);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get('individual')
  @UseGuards(AuthGuard)
async    findAllIndividual(@Req() req: Request,@Query() queryBloodIndividulDto:QueryBloodIndividulDto) {
    try {
      console.log(req["user"]["_id"]);
      return await this.bloodRequestService.findAllIndividual( req['user']['_id'],queryBloodIndividulDto);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
   
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bloodRequestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBloodRequestDto: UpdateBloodRequestDto) {
    return this.bloodRequestService.update(+id, updateBloodRequestDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: Types.ObjectId,) {
    console.log('id is ',id);
    return this.bloodRequestService.remove(id);
  }
}
