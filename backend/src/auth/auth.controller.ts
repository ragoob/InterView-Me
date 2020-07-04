import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import {UserRegisterDTO } from './dtos/user.register';
import { UserAuthDTO } from './dtos/user.auth';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {

  constructor(private authService : AuthService) {
    
  }

  @Post('/singup')
  async signUp(@Body(ValidationPipe) user: UserRegisterDTO): Promise<void> {
    return await this.authService.singup(user);
  }

  @Post('/singIn')
  async signIn(@Body(ValidationPipe) userAuth: UserAuthDTO): Promise<{}> {
    return this.authService.singIn(userAuth);
  }
}
