import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import handlebars from 'handlebars';
import * as fs from 'fs';

@Injectable()
export class NotificationService {
  private transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: configService.get<string>('SMTP_HOST'),
      port: configService.get<number>('SMTP_PORT'),
      secure: false, // Set to false for STARTTLS
      requireTLS: true, // Require STARTTLS
      auth: {
        user: configService.get<string>('SMTP_USER'),
        pass: configService.get<string>('SMTP_PASSWORD'),
      },
    });
  }

  async sendEmail(
    from: string,
    to: string,
    subject: string,
    text: string,
    html: string,
  ) {
    try {
      const mailOptions = {
        from: from,
        to,
        subject,
        text,
        html,
      };

      await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Failed to send email:', error);
    }
  }

  public async renderTemplate(
    templateName: string,
    data: any,
  ): Promise<string> {
    const templatePath = `${__dirname}/templates/${templateName}.hbs`;
    console.log(templatePath)
    const source = await fs.promises.readFile(templatePath, 'utf8');
    const template = handlebars.compile(source);
    return template(data);
  }
}
