import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from './entities/user.entity';
import { IdentifyController } from './identify.controller';
import { IdentifyService } from './identify.service';
import { User } from './entities/user.typeorm';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants';

import { JwtStrategy } from '../strategy/jwt.strategy';
import { RefreshStrategy } from 'src/strategy/refresh.strategy';

// passport 모듈 선언
@Module({
  imports: [
    TypeOrmModule.forFeature([User]), 
    PassportModule, // passport 모듈
    JwtModule.register({ // jwt 모듈 (기본 모듈)
      // secret: jwtConstants.secret, // 비밀키
      // signOptions: { expiresIn: '20s' }, // jwt 관련 옵션들
    }),
    // JwtModule.register({ // 재발급 키
    //   secret: jwtConstants.refresh,
    //   signOptions: { expiresIn: '1h' }, 
    // })
  ],
  controllers: [IdentifyController],
  providers: [IdentifyService, LocalStrategy, JwtStrategy, RefreshStrategy]
})
export class IdentifyModule {}
