import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormconfig } from './config/typeorm.config';
import { InterviewModule } from './interview/interview.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormconfig),
    AuthModule,
    InterviewModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
