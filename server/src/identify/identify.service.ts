import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.typeorm';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class IdentifyService {
    constructor( // 생성자로 내부 변수 구축
        @InjectRepository(User)
        private readonly userRepository: UserRepository
    ) {}

    // 로그인 요청 (사용자 확인)
    requestLogin( id: string, pw: string ) {
        // id, pw 가 모두 일치하는 사용자 찾기
        // return this.user.findIndex( user => user.id === id && user.pw === pw ) >= 0;
        return this.userRepository.findOne({ where: { id: id, pw: pw }});
    }

    // 회원가입 요청 (존재 id 판단)
    requestSignUp( id: string, pw: string ) {
        // if(this.users.findIndex( user => user.id === id ) >= 0) return false;
        // this.users.push({ id: id, pw: pw })
        // return true;
        return this.userRepository.create({ id: id, pw: pw }).save();
    }
}
