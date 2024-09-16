import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query, HttpException } from '@nestjs/common';
import { BloodRequestService } from './blood-request.service';
import { CreateBloodRequestDto } from './dto/create-blood-request.dto';
import { UpdateBloodRequestDto } from './dto/update-blood-request.dto';
import { AuthGuard } from 'src/user/auth.guard';
import { QueryBloodDto } from './dto/query-blood.dto';

@Controller('blood-request')
export class BloodRequestController {
  constructor(private readonly bloodRequestService: BloodRequestService) {}

  @Post()
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
async    findAllIndividual(@Req() req: Request,@Query() queryBloodDto:QueryBloodDto) {
    try {
      console.log(req["user"]["_id"]);
      return await this.bloodRequestService.findAllIndividual( req['user']['_id'],queryBloodDto);
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
  remove(@Param('id') id: string) {
    return this.bloodRequestService.remove(+id);
  }
}
