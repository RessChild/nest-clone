import { Body, Controller, Post } from '@nestjs/common';
import { IdentifyService } from './identify.service';

@Controller('/api/identify')
export class IdentifyController {
    constructor(private readonly identify: IdentifyService) {}

    // 로그인 요청
    @Post('/login')
    requestLogin(@Body('id') id: string, @Body('pw') pw: string): Boolean {
       return this.identify.requestLogin(id, pw);
    }
}
