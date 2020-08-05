import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { LoginModel } from 'src/models/login.model';
import { UserDTO } from 'src/models/user.dto';
import { AuthService } from 'src/services/auth.service';

@Controller()
export class AuthController {

    constructor(private authService: AuthService) {

    }

    @Post('singup')
    async signUp(@Body(ValidationPipe) model: UserDTO): Promise<void> {

        return this.authService.singup(model);
    }

    @Post('singIn')
    async signIn(@Body(ValidationPipe) model: LoginModel): Promise<{}> {
        return this.authService.singIn(model);
    }
}