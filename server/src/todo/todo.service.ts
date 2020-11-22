import { Injectable } from '@nestjs/common';
import { Todo } from './entities/todo.entity';

@Injectable() // 작업을 수행할 함수
export class TodoService {
    private todos: Todo[] = [];

    getTodos(): Todo[] {
        return this.todos;
    }

    addTodo(t: Todo) {
        this.todos.push(t);
    }

    removeTodo(num: number) {
        this.todos = this.todos.filter( (todo,idx) => idx !== num );
    }
    // getTodo(): Todo {
    //     return null;
    // }
}
