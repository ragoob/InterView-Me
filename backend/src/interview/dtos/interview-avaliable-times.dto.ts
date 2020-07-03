import { IsDefined } from "class-validator";

export class InterViewAvaliableTimesDTO{
  id: number;
  @IsDefined()
  start: Date;
  @IsDefined()
  end: Date;
  isSelected?: boolean;
}