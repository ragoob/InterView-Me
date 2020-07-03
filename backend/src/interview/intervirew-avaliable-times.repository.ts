import { Repository, EntityRepository } from "typeorm";
import { InterviewAvaliableTimes } from "./interview-avaliable-times.entity";

@EntityRepository(InterviewAvaliableTimes)
export class InterviewAvaliableTimesRepository extends Repository<InterviewAvaliableTimes>{


}