import { IsEmail, IsString, MinLength } from "class-validator";

export class LoginModel {
    @IsEmail()
    @IsString()
    @MinLength(3)
    email: string;
    @IsString()
    password: string;
    rememberMe?: boolean;
}