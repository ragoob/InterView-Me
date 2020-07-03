import { Repository, EntityRepository } from "typeorm"
import { User } from "./user.entity"
import { UNIQUE_CONSTRAINT } from "src/config/typeormErrorscode.config";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";

@EntityRepository(User)
export class UserRepository extends Repository < User > {
  
  async createUser(user: User): Promise<void> {
   try {
    await this.save(user);
   } catch (error) {
     if (error.code === UNIQUE_CONSTRAINT) {
       throw new ConflictException("UserName already exists ")
     }
     else {
       throw new InternalServerErrorException(error.message);
     }
   }
  }
}