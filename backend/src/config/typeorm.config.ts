import {TypeOrmModuleOptions} from '@nestjs/typeorm'
export const typeormconfig:  TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: (process.env.POSTGRES_PORT || 5432) as number,
  username: process.env.POSTGRES_USERNAME || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'interviewme',
  entities: ["dist/**/*.entity{.ts,.js}"],
  synchronize :true  
}