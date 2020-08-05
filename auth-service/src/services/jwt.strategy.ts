
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UserDTO } from 'src/models/user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET || "secret@2010!"
        })
    }

    async validate(payload: any): Promise<UserDTO> {

        if (!payload) {
            throw new UnauthorizedException("Invalid username or password");
        }
        return payload as UserDTO;
    }
}