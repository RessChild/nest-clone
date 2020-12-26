// 유저 DB 에 접근할 타입

import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("todos")
export class Todo extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 12 })
    user: string;
    
    @Column({ length: 50 })
    todos: string;
}