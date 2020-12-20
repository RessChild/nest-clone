import { Body, Controller, Post } from '@nestjs/common';
import { IdentifyService } from './identify.service';

@Controller('/api/identify')
export class IdentifyController {
    constructor(private readonly identify: IdentifyService) {}

    // 로그인 요청
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
}
