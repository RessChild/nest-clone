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

// passport 모듈 선언
@Module({
  imports: [
    TypeOrmModule.forFeature([User]), 
    PassportModule, // passport 모듈
    JwtModule.register({ // jwt 모듈
      secret: jwtConstants.secret, // 비밀키
      signOptions: { expiresIn: '30s' }, // jwt 관련 옵션들
    })
  ],
  controllers: [IdentifyController],
  providers: [IdentifyService, LocalStrategy, JwtStrategy]
})
export class IdentifyModule {}
