import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EntityRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { UserRegisterDTO } from './dtos/user.register';
import * as bcrypt from 'bcrypt';
import { UserAuthDTO } from './dtos/user.auth';
import { JwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {

  constructor(@InjectRepository(User) private userRepository: UserRepository, private jwtService : JwtService) {

  }

  async singup(userregister: UserRegisterDTO): Promise<void> {
    const salt = await bcrypt.genSalt();
    const user: User = new User();
    user.username = userregister.username;
    user.password = await this.hashPassword(userregister.password, salt);
    user.jobtitle = userregister.jobtitle;
    user.salt = salt;
    user.emailAddress = userregister.emailAddress;
    await this.userRepository.createUser(user);
  }

  async singIn(userAuth: UserAuthDTO): Promise<{accessToken}> {
    const { username, password } = userAuth;
    const user = await this.userRepository.findOne({ username });

    if (user && await user.validatePassword(password)) {
      const payload: JwtPayload = { username };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };

    }

    else {
      throw new UnauthorizedException("Invalid username or password");
    }

  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }



}
