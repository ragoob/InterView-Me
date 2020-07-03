import { InterviewRequestStatus } from "../interview-request-status.enum";
import { ApiProperty } from "@nestjs/swagger";
import { IsDefined } from "class-validator";
import { InterViewAvaliableTimesDTO } from "./interview-avaliable-times.dto";

export class InterviewRequestDTO{
  id: number;
  invitationURL?: string;
  requestStatus: InterviewRequestStatus;
  requestorId: number;

  @ApiProperty()
  @IsDefined({message : "You should select the interviewer"})
  interviewerId: number;
  interviewAvaliableTimes  ? : InterViewAvaliableTimesDTO[]
}