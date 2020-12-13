import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class IdentifyService {
    private users: User[] = [];

    // 로그인 요청 (사용자 확인)
    requestLogin( id: string, pw: string ): Boolean {
        // id, pw 가 모두 일치하는 사용자 찾기
        return this.users.findIndex( user => user.id === id && user.pw === pw ) >= 0;
    }

    // 회원가입 요청 (존재 id 판단)
    requestSignUp( id: string, pw: string ): Boolean {
        if(this.users.findIndex( user => user.id === id ) >= 0) return false;
        this.users.push({ id: id, pw: pw })
        return true;
    }
}
