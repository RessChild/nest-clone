import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class IdentifyService {
    private users: User[] = [
        { id: "1234", pw: "qwer" }
    ];

    // 로그인 요청 (사용자 확인)
    requestLogin( id: string, pw: string ): Boolean {
        // id, pw 가 모두 일치하는 사용자 찾기
        return this.users.findIndex( user => user.id === id && user.pw === pw ) >= 0;
    }
}
