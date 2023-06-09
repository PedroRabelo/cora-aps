import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { PrismaModule } from './prisma/prisma.module';
import { TenantsModule } from './resources/tenants/tenants.module';
import { ProfessionalsModule } from './resources/professionals/professionals.module';
import { PatientsModule } from './resources/patients/patients.module';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { SurveysModule } from './resources/surveys/surveys.module';
import { CareLineModule } from './resources/care-line/care-line.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailModule,
    PrismaModule,
    AuthModule,
    TenantsModule,
    ProfessionalsModule,
    PatientsModule,
    MailModule,
    SurveysModule,
    CareLineModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule { }
