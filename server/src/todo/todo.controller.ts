import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { User } from 'src/identify/entities/user.entity';
import { Todo } from './entities/todo.entity';
import { TodoService } from './todo.service';

@Controller('/api/todo-list') // 라우터
export class TodoController {
    constructor(private readonly todo: TodoService) {}

    @Post()
    getTodos(@Body() user: string){
        return this.todo.getTodos(user);
    }

    @Post('/add')
    addTodo(@Body() user: string, @Body() t: Todo) {
        this.todo.addTodo(user, t);
    }

    @Post('/remove/:idx')
    removeTodo(@Body() user: string, @Param('idx') num: string) {
        console.log(num);
        this.todo.removeTodo(user, Number(num));
    }
}
