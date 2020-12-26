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
    async removeTodo(@Body("id") id: string) {
        // console.log(num);
        const result = await this.todo.removeTodo(parseInt(id));
        console.log("remove list", result);
        return result;
    }

    @Post('/edit')
    async editTodo(@Body("id") id: string, @Body("todos") todos: string) {
        const result = await this.todo.editTodo(parseInt(id), todos);
        console.log("edit list", result);
        return result;
    }
}
