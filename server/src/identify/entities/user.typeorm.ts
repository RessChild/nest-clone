// 유저 DB 에 접근할 타입

import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity("user")
export class User extends BaseEntity {
    @PrimaryColumn({ length: 12 })
    id: string;
    
    @Column({ length: 12 })
    pw: string;
}