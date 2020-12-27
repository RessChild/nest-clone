import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from './entities/user.entity';
import { IdentifyController } from './identify.controller';
import { IdentifyService } from './identify.service';
import { User } from './entities/user.typeorm';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';

// passport 모듈 선언
@Module({
  imports: [TypeOrmModule.forFeature([User]), PassportModule],
  controllers: [IdentifyController],
  providers: [IdentifyService, LocalStrategy]
})
export class IdentifyModule {}
