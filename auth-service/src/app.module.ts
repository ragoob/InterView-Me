import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './services/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/user.entity';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || "secret@2010!",
      signOptions: {
        expiresIn: 86400,
      }
    }),

    TypeOrmModule.forRoot(
      {
        "type": "postgres",
        "host": "52.249.199.70",
        "port": 5432,
        "username": "postgres",
        "password": "auth-service",
        "database": "authentication_db",
        "logging": true,
        "autoLoadEntities": true,
        "synchronize": true,
        "entities": [
          "dist/**/*.entity.{ts,js}",

        ]
      }),
    TypeOrmModule.forFeature([
      User

    ]),

  ],
  controllers: [AuthController],
  providers: [JwtStrategy, AuthService],
})
export class AppModule { }
