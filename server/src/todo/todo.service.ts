import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { Todo as TodoClass } from './entities/todo.entity';
import { Todo } from './entities/todo.typeorm';
import { TodosRepository } from './repositories/todos.repository';

@Injectable() // 작업을 수행할 함수
export class TodoService {
    // private todos: User<Todo> = {};
    constructor( // 생성자로 내부 변수 구축
        @InjectRepository(Todo)
        private readonly todosRepository: TodosRepository
    ) {}

    // 리스트 출력
    getTodos(user: string) {
        console.log( user );
        return this.todosRepository.find({ where: { user: user }});
    }

    // 리스트 추가
    addTodo(user: string, t: string) {
        return this.todosRepository.create({ user: user, todos: t }).save();
    }

    // 리스트 제거
    removeTodo(id: number) {
        // this.todos[user] = this.todos[user].filter( (todo,idx) => idx !== num );
        // return this.todosRepository.remove()
        return this.todosRepository.delete({ id: id });
    }

    editTodo(id: number, todos: string) {
        return this.todosRepository.update(id , { todos: todos });
    }
}