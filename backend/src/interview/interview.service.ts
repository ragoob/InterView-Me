import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InterViewRequestRepository } from './interview-request.repository';
import { InterviewRequest } from './interview-request.entity';
import { InterviewRequestDTO } from './dtos/intervierw-request.dto';
import { InterviewRequestStatus } from './interview-request-status.enum';
import { InterviewAvaliableTimes } from './interview-avaliable-times.entity';
import { InterviewAvaliableTimesRepository } from './intervirew-avaliable-times.repository';
import { InterViewAvaliableTimesDTO } from './dtos/interview-avaliable-times.dto';

@Injectable()
export class InterviewService {
  constructor(
    @InjectRepository(InterviewRequest) private interViewRequestRepository: InterViewRequestRepository,
    @InjectRepository(InterviewAvaliableTimes) private interviewTimesRepository: InterviewAvaliableTimesRepository

  ) {

  }

  async create(request: InterviewRequestDTO): Promise<void> {

    const requestEntity: InterviewRequest = new InterviewRequest();
    Object.assign(requestEntity, request);
    requestEntity.requestStatus = InterviewRequestStatus.REQUESTED;
    await this.interViewRequestRepository.save(requestEntity);
  }

  async changeStatus(requestId: number, status: InterviewRequestStatus) {
    await this.interViewRequestRepository.update({ id: requestId }, { requestStatus: status });
  }

  async update(request: InterviewRequestDTO): Promise<void> {
    const requestEntity: InterviewRequest = new InterviewRequest();
    Object.assign(requestEntity, request);
    await this.interViewRequestRepository.save(requestEntity);
  }

  async delete(id: number): Promise<void> {
    await this.interViewRequestRepository.delete({ id: id });
  }

  async getUserInvitations(userId: number): Promise<InterviewRequestDTO[]> {
    const invitations = await this.interViewRequestRepository.find({ requestorId: userId });
    return invitations.map(item => {
      const request: InterviewRequestDTO = new InterviewRequestDTO();
      Object.assign(request, item);
      return request;
    })
  }

  async getUserInterviews(userId: number): Promise<InterviewRequestDTO[]> {
    const invitations = await this.interViewRequestRepository.find({ interviewerId: userId });
    return invitations.map(item => {
      const request: InterviewRequestDTO = new InterviewRequestDTO();
      Object.assign(request, item);
      return request;
    })
  }

  async addRequestTimes(times: InterViewAvaliableTimesDTO): Promise<void> {
    const timesEntity: InterviewAvaliableTimes = new InterviewAvaliableTimes();
    Object.assign(timesEntity, times);
    await this.interviewTimesRepository.save(timesEntity);
  }

  async removeRequestTimes(id: number): Promise<void> {
    await this.interviewTimesRepository.delete({ id: id })
  }

  async selecttimes(id: number): Promise<void> {
    await this.interviewTimesRepository.update({ id: id }, { isSelected: true });
  }
}
