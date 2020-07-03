import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { User } from "src/auth/user.entity";
import { InterviewAvaliableTimes } from "./interview-avaliable-times.entity";
import { InterviewRequestStatus } from "./interview-request-status.enum";
@Entity()
export class InterviewRequest extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({nullable : true})
  invitationURL?: string;
  @Column({nullable : true})
  feedBack?: string;
  @Column()
  requestStatus: InterviewRequestStatus;
  @Column()
  requestorId: number;
  @Column()
  interviewerId: number;
  @ManyToOne(type => User, user => user.myInterviews)
  @JoinColumn({ name: 'requestorId' })
  requestor: User;
  @ManyToOne(type => User, user => user.myInterviews)
  @JoinColumn({ name: 'interviewerId' })
  interviewer: User;
  @OneToMany(type => InterviewAvaliableTimes, interviewAvaliableTimes => interviewAvaliableTimes.request,{eager : true})
  interviewAvaliableTimes: InterviewAvaliableTimes[]
} 