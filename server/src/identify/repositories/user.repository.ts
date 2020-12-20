import { EntityRepository, Repository } from "typeorm";
import { User } from "../entities/user.typeorm";

// user Entity에 접근할 수 있는 기본 인터페이스
@EntityRepository(User)
export class UserRepository extends Repository<User> {}