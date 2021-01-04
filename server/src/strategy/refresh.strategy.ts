import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from 'src/constants';

// jwt 접근법
@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.refresh,
    });
  }
  
  async validate(jwt: any) {
    console.log('refresh validate', jwt);
    return { id: jwt.id };
  }
}