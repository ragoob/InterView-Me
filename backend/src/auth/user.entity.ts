import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Unique, OneToMany } from "typeorm";
import * as bcrypt from 'bcrypt'
import { InterviewRequest } from "src/interview/interview-request.entity";
@Entity()
@Unique(["username"])
export class User  extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    username: string;
    @Column()
    password: string;
    @Column()
    salt: string;
    @Column()
    jobtitle: string;   
    @Column()
    emailAddress: string;
    @OneToMany(type => InterviewRequest, interviewRequest => interviewRequest.interviewer)
    myInterviews: InterviewRequest[];
    @OneToMany(type => InterviewRequest, interviewRequest => interviewRequest.requestor)
    myInvitations: InterviewRequest[];
    async validatePassword(password: string): Promise<boolean>{
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
}