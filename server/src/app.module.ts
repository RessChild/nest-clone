import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { IdentifyModule } from './identify/identify.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './identify/entities/user.typeorm';
import { Todo } from './todo/entities/todo.typeorm';

import "dotenv/config";
// dotenv.config();

@Module({
  imports: [TodoModule, IdentifyModule, TypeOrmModule.forRoot(
    {
      "type": "mysql",
      "host": process.env.DB_HOST,
      "port": Number(process.env.DB_PORT),
      "username": process.env.DB_ID,
      "password": process.env.DB_PW,
      "database": process.env.DB_DB,
      "extra": {
          "ssl": {
              "rejectUnauthorized": false
          }
      },
      "entities": [User, Todo],
  }
  )],
  controllers: [],
  providers: [],
})
export class AppModule {}
