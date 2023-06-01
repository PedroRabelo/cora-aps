import { Module } from '@nestjs/common';
import { CareLineService } from './care-line.service';
import { CareLineController } from './care-line.controller';

@Module({
  controllers: [CareLineController],
  providers: [CareLineService]
})
export class CareLineModule {}
