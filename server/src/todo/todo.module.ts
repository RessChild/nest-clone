import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConstants } from 'src/constants';
import { Todo } from './entities/todo.typeorm';
import { JwtStrategy } from '../strategy/jwt.strategy';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([Todo]),
    JwtModule.register({ // jwt 모듈
      secret: jwtConstants.secret, // 비밀키
      // signOptions: { expiresIn: '10s' }, // jwt 관련 옵션들
    })
  ],
  controllers: [TodoController],
  providers: [TodoService, JwtStrategy],
})
export class TodoModule {}
