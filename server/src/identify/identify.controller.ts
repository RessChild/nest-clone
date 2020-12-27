import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IdentifyService } from './identify.service';

@Controller('/api/identify')
export class IdentifyController {
    constructor(private readonly identify: IdentifyService) {}

    // 로그인 요청
    @UseGuards(AuthGuard('local')) // passport 의 로컬 로그인
    @Post('/login')
    async requestLogin(@Body('id') id: string, @Body('pw') pw: string) {
        const result = await this.identify.requestLogin(id, pw);
        console.log("request", result);
        return result;
    }

    // 회원가입 요청
    @Post('/sign-up')
    async requestSignUp(@Body('id') id: string, @Body('pw') pw: string) {
        const result = await this.identify.requestSignUp(id, pw);
        console.log("signup", result);
        return result;
    }

    // local 권한 체크. validate 호출
    @UseGuards(AuthGuard('local'))
    @Post('/req')
    a(@Request() req) {
        // req.user 로 인증 정보 접근 가능
        console.log(req.user);
        return req.user;
    }
}
