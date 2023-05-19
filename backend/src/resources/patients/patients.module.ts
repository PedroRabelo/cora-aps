import { Module } from '@nestjs/common';
import { PatientsController } from './controllers/patients.controller';
import { PatientsService } from './services/patients.service';
import { HealthRecordController } from './controllers/health-record.controller';
import { HealthRecordService } from './services/health-record.service';
import { VitalSignsController } from './controllers/vital-signs.controller';
import { VitalSignsService } from './services/vital-signs.service';

@Module({
  controllers: [
    PatientsController,
    HealthRecordController,
    VitalSignsController,
  ],
  providers: [
    PatientsService,
    HealthRecordService,
    VitalSignsService
  ]
})
export class PatientsModule { }
