import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from './entities/user.entity';
import { IdentifyController } from './identify.controller';
import { IdentifyService } from './identify.service';
import { User } from './entities/user.typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [IdentifyController],
  providers: [IdentifyService]
})
export class IdentifyModule {}
