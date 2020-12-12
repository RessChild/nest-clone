import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { IdentifyModule } from './identify/identify.module';

@Module({
  imports: [TodoModule, IdentifyModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
