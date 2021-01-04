import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
  
@Injectable()
export class RefreshAuthGuard extends AuthGuard('refresh') {
    canActivate(context: ExecutionContext) {
        // Add your custom authentication logic here
        // for example, call super.logIn(request) to establish a session.
        return super.canActivate(context);
    }

    // jwt 확인 시, 정보를 받아오는 중간다리
    handleRequest(err, user, info) {
        console.log("refresh-token::", err, user, info)
        if (err || !user) {
        throw err || new UnauthorizedException();
        }
        return user;
    }
}
