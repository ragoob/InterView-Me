import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtModule, JwtService } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './jwt.strategy';
@Module({
  imports: [
    PassportModule.register({
      defaultStrategy : 'jwt'
    }),
    TypeOrmModule.forFeature([UserRepository]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || "secret@2010!",
      signOptions: {
        expiresIn : 86400
      }
    }),
     
  
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy
  
  ],
  exports: [
    JwtStrategy,
    PassportModule
  ]
})
export class AuthModule {}
