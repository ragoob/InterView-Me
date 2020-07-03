import { Repository, EntityRepository } from "typeorm";
import { InterviewRequest } from "./interview-request.entity";

@EntityRepository(InterviewRequest)
export class InterViewRequestRepository extends Repository<InterviewRequest>{


}