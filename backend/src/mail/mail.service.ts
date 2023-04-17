import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { PatientEntity } from 'src/resources/patients/entities/patient.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) { }

  async sendPatientConfirmation(patient: PatientEntity, token: string) {
    const url = `example.com/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: process.env.MAIL_SANDBOX === 'true' ? process.env.MAIL_TO : patient.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Config',
      template: './transactional',
      context: {
        name: patient.name,
        url,
      },
    });
  }
}
