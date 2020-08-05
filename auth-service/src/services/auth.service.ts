import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserDTO } from 'src/models/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from "typeorm";
import { LoginModel } from 'src/models/login.model';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService,
        @InjectRepository(User) private readonly userRepository: Repository<User>) {

    }

    public async singup(model: UserDTO): Promise<void> {
        try {
            const salt = await bcrypt.genSalt();
            const user: User = new User();
            Object.assign(user, model);
            user.createdAt = new Date(Date.now());
            user.password = await this.hashPassword(model.password, salt);
            user.passwordSalt = salt;
            await this.userRepository.insert(user);
        } catch (error) {
            throw new ConflictException(`User name already exists`);
        }
    }

    public async singIn(model: LoginModel): Promise<any> {
        const user: User = await this.userRepository.findOne({ email: model.email });
        if (user && await user.validatePassword(model.password)) {
            const accessToken = this.jwtService.sign(model);
            return {
                accessToken,
                userName: model.email,
                email: model.email
            }
        }
        else {
            throw new UnauthorizedException("Invalid username or password");
        }
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }



}