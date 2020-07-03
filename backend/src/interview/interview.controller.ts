import { Controller, Post, Body, ValidationPipe, UseGuards, UsePipes, ConflictException, Put, Patch, Param, Delete } from '@nestjs/common';
import { GetUser } from 'src/auth/get-user.decorator';
import { InterviewRequestDTO } from './dtos/intervierw-request.dto';
import { User } from 'src/auth/user.entity';
import { InterviewService } from './interview.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@Controller('interview')
  @UseGuards(AuthGuard())
  @ApiTags('Interview')

export class InterviewController {

  constructor(private interviewService: InterviewService) {
    
  }
  @Post()
  @UsePipes(ValidationPipe)
  async createRequest(@GetUser() currentUser: User, @Body() request: InterviewRequestDTO): Promise<void> {
    if (request.interviewerId === currentUser.id) {
      throw new ConflictException("you can not invite your self")
    }
    request.requestorId = currentUser.id;
   
   return  this.interviewService.create(request);
  }

  @Put()
  @UsePipes(ValidationPipe)
  async updateRequest( @Body() request: InterviewRequestDTO): Promise<void> {
   return  this.interviewService.update(request);
  }

  @Patch(':id')
  async changeStaus(@Param() params, @Body('status') status: number) { 
    return this.interviewService.changeStatus(params.id, status);

  }

  @Delete(':id')
  async delete(@Param() params) {
    return this.interviewService.delete(params.id);
  }
}
