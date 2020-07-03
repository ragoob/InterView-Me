import { BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, Entity } from "typeorm";
import { InterviewRequest } from "./interview-request.entity";
@Entity()
export class InterviewAvaliableTimes extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;
  @Column({type : 'timestamptz'})
  start: Date;
  @Column({type : 'timestamptz'})
  end: Date;
  @Column({nullable : true})
  isSelected?: boolean;
  @ManyToOne(type => InterviewRequest, interviewRequest => interviewRequest.interviewAvaliableTimes)
  request: InterviewRequest;
}