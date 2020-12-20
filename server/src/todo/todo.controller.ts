import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
// import { User } from 'src/identify/entities/user.entity';
import { Todo } from './entities/todo.entity';
import { TodoService } from './todo.service';

@Controller('/api/todo-list') // 라우터
export class TodoController {
    constructor(private readonly todo: TodoService) {}

    @Post()
    async getTodos(@Body("user") user: string){
        const result = await this.todo.getTodos(user);
        console.log("todoList",result);
        return result;
    }

    @Post('/add')
    async addTodo(@Body("user") user: string, @Body("content") t: string) {
        const result = await this.todo.addTodo(user, t);
        console.log("add list", result);
        return result;
    }

    @Post('/remove')
    removeTodo(@Body("id") id: string, @Body("todos") todos: string) {
        // console.log(num);
        this.todo.removeTodo(id, todos);
    }
}
