import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { IdentifyService } from "./identify.service";

// 로컬 로그인 방법 정의
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    // 생성자
    constructor(private identifyService: IdentifyService) {
        // strategy 는 반드시 super 를 호출해야 함 ( 참조 키 명 조정 가능 )
        super({
            usernameField: 'id',
            passwordField: 'pw',
        });
    }

    // req.user 설정 구문 ( 권한 체크 시, 자동 호출 )
    async validate(id: string, pw: string) {
        const user = await this.identifyService.validate(id, pw);
        if( !user ) throw new UnauthorizedException(); // 권한 오류
        return user; // 그 외엔 정보를 반환하여 등록
    }
}