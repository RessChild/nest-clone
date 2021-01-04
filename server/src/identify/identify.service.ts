import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { jwtConstants } from "../constants";
import { User } from './entities/user.typeorm';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class IdentifyService {
    constructor( // 생성자로 내부 변수 구축
        @InjectRepository(User)
        private readonly userRepository: UserRepository,
        private jwtService: JwtService // JWT 용 객체
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

    // passport 인증용 함수
    async validate( id: string, pw: string ){
        const result = await this.userRepository.findOne({ where: { id: id, pw: pw }});
        if( result ) { // 사용자 정보가 있다면
            // 비밀번호를 제외한 나머지 정보만 반환
            const { pw, ...others } = result;
            return others;
        }
        else null;
    }

    // jwt 생성 함수
    async login(user: any) {
        return {
            access_token: this.jwtService.sign(user, { secret: jwtConstants.secret, expiresIn: "15s" }),
            refresh_token: this.jwtService.sign(user, { secret: jwtConstants.refresh, expiresIn: "1h" }),
        }
    }

    // jwt 재발급
    async refreshJwt(user: any) {
        return {
            access_token: this.jwtService.sign(user, { secret: jwtConstants.secret, expiresIn: "15s" }),
        }
    }
}
