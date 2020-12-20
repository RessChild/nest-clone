import { EntityRepository, Repository } from "typeorm";
import { Todo } from "../entities/todo.typeorm";

// user Entity에 접근할 수 있는 기본 인터페이스
@EntityRepository(Todo)
export class TodosRepository extends Repository<Todo> {}