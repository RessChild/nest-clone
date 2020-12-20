// 유저 DB 에 접근할 타입

import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity("todos")
export class Todo extends BaseEntity {
    @PrimaryColumn({ length: 12 })
    id: string;
    
    @PrimaryColumn({ length: 50 })
    todos: string;
}