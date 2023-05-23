import { Module } from '@nestjs/common';
import { PatientsController } from './controllers/patients.controller';
import { PatientsService } from './services/patients.service';
import { HealthRecordController } from './controllers/health-record.controller';
import { HealthRecordService } from './services/health-record.service';
import { VitalSignsController } from './controllers/vital-signs.controller';
import { VitalSignsService } from './services/vital-signs.service';
import { MeasuresController } from './controllers/measures.controller';
import { MeasuresService } from './services/measures.service';

@Module({
  controllers: [
    PatientsController,
    HealthRecordController,
    VitalSignsController,
    MeasuresController,
  ],
  providers: [
    PatientsService,
    HealthRecordService,
    VitalSignsService,
    MeasuresService
  ]
})
export class PatientsModule { }
