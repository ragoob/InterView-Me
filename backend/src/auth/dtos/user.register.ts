import { isString } from "util";
import {IsString, MaxLength, MinLength, IsEmail} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UserRegisterDTO{
  @ApiProperty()
  @IsString()
  @MaxLength(30)
  @MinLength(3)
  username: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  jobtitle: string;

  @IsString()
  @IsEmail()
  emailAddress: string;
}