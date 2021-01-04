import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/AuthGuard/JwtAuthGuard';
import { RefreshAuthGuard } from 'src/AuthGuard/RefreshAuthGuard';
import { IdentifyService } from './identify.service';

@Controller('/api/identify')
export class IdentifyController {
    constructor(private readonly identify: IdentifyService) {}

    // 로그인 요청
    // jwt 권한 체크. local.strategy.ts 의 validate 를 자동 호출
    @UseGuards(AuthGuard('local')) // passport 의 로컬 로그인
    @Post('/login')
    async requestLogin(@Request() req) {
        // const result = await this.identify.requestLogin(id, pw);
        // console.log("request", result);
        // return result;

        // 얻어낸 사용자 정보로 jwt 토큰을 만들어서 반환
        const jwt = await this.identify.login(req.user);
        console.log('login:',jwt);
        return jwt;
    }

    // 회원가입 요청
    @Post('/sign-up')
    async requestSignUp(@Body('id') id: string, @Body('pw') pw: string) {
        const result = await this.identify.requestSignUp(id, pw);
        console.log("signup", result);
        return result;
    }

    // 새로운 토큰 발급
    @UseGuards(RefreshAuthGuard)
    // @UseGuards(JwtAuthGuard)
    // 권한 허용이 안되는 이유는 token 변환 방식이 하나로 적용되기 때문
    // so, jwtService 의 옵션 값으로 secret 을 지정해줘서 해결
    @Post('/new-token')
    async requestNewToken(@Request() req) {
        const jwt = await this.identify.refreshJwt(req.user);
        console.log('new-token', jwt);
        return jwt;
    }

    @UseGuards(JwtAuthGuard)
    @Post('/req')
    abc(@Request() req){
        console.log('jwt auth', req.user);
        return 'abc';
    }
}
