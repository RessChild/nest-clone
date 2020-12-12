import { Module } from '@nestjs/common';
import { IdentifyController } from './identify.controller';
import { IdentifyService } from './identify.service';

@Module({
  controllers: [IdentifyController],
  providers: [IdentifyService]
})
export class IdentifyModule {}
