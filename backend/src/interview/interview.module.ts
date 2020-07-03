import { Module } from '@nestjs/common';
import { InterviewService } from './interview.service';
import { InterviewController } from './interview.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterViewRequestRepository } from './interview-request.repository';
import { InterviewRequest } from './interview-request.entity';
import { AuthModule } from 'src/auth/auth.module';
import { InterviewAvaliableTimes } from './interview-avaliable-times.entity';
import { InterviewAvaliableTimesRepository } from './intervirew-avaliable-times.repository';
import { InterviewTimesController } from './interview-times.controller';

@Module({
  imports: [TypeOrmModule.forFeature([InterviewRequest,InterViewRequestRepository,InterviewAvaliableTimes,InterviewAvaliableTimesRepository]),AuthModule],
  providers: [InterviewService],
  controllers: [InterviewController, InterviewTimesController]
})
export class InterviewModule {}
