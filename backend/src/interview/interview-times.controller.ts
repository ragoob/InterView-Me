import { Controller, Post, Body, ValidationPipe, UseGuards, UsePipes, Put, Patch, Param, Delete } from '@nestjs/common';
import { InterviewService } from './interview.service';
import { AuthGuard } from '@nestjs/passport';
import { InterViewAvaliableTimesDTO } from './dtos/interview-avaliable-times.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('interviewTimes')
  @UseGuards(AuthGuard())
  @ApiTags('Interview Times')

export class InterviewTimesController {

  constructor(private interviewService: InterviewService) {
    
  }
 
  @Post()
  @UsePipes(ValidationPipe)
  async create( @Body() requesttimes: InterViewAvaliableTimesDTO): Promise<void> {
   return  this.interviewService.addRequestTimes(requesttimes);
  }

  @Delete(':id')
  @UsePipes(ValidationPipe)
  async delete(@Param() params): Promise<void> {
   return  this.interviewService.removeRequestTimes(params.id);
  }

  @Patch(':id')
  async select(@Param() params) : Promise<void>{
    return this.interviewService.selecttimes(params.id);
  }
}
