import { Injectable } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { User } from "./entities/users.entity";

@Injectable() // 작업을 수행할 함수
export class TodoService {
    private todos: User<Todo> = {};

    // 리스트 출력
    getTodos(user: string): Todo[] {
        return this.todos[user] || [];
    }

    // 리스트 추가
    addTodo(user: string, t: Todo) {
        this.todos[user] = [ ...(this.todos[user] || []), t ];
    }

    // 리스트 제거
    removeTodo(user: string, num: number) {
        this.todos[user] = this.todos[user].filter( (todo,idx) => idx !== num );
    }
}