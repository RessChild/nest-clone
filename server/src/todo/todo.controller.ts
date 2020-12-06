import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { TodoService } from './todo.service';

@Controller('/api/todo-list') // 라우터
export class TodoController {
    constructor(private readonly todo: TodoService) {}

    @Get()
    getTodos(){
        return this.todo.getTodos();
    }

    @Post('/add')
    addTodo(@Body() t: Todo) {
        this.todo.addTodo(t);
    }

    @Delete('/remove/:idx')
    removeTodo(@Param('idx') num: string) {
        console.log(num);
        this.todo.removeTodo(Number(num));
    }
}
