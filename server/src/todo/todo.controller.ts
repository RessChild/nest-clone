import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// import { User } from 'src/identify/entities/user.entity';
import { Todo } from './entities/todo.entity';
import { TodoService } from './todo.service';

@Controller('/api/todo-list') // 라우터
export class TodoController {
    constructor(private readonly todo: TodoService) {}

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getTodos(@Request() req){
        const { user: { id }} = req;
        const result = await this.todo.getTodos(id);
        console.log("todoList",result);
        return {
            user: id,
            todos: result,
        };
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/add')
    async addTodo(@Request() req, @Body("content") t: string) {
        const { user: { id }} = req;
        const result = await this.todo.addTodo(id, t);
        console.log("add list", result);
        return result;
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/remove')
    async removeTodo(@Body("id") id: string) {
        // console.log(num);
        const result = await this.todo.removeTodo(parseInt(id));
        console.log("remove list", result);
        return result;
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/edit')
    async editTodo(@Body("id") id: string, @Body("todos") todos: string) {
        const result = await this.todo.editTodo(parseInt(id), todos);
        console.log("edit list", result);
        return result;
    }
}
