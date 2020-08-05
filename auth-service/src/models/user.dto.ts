import { IsEmail, IsString, MinLength } from "class-validator";

export class UserDTO {
    @IsString()
    @MinLength(3)
    userName: string;
    @IsString()
    @MinLength(6)
    password: string;
    @IsString()
    @IsEmail()
    email: string;
}