import { Injectable, Logger } from '@nestjs/common';
import { HYPEHIRE_EMAIL, SUPPORTED_TOKENS } from '../common';
import { ApiConfig } from '../config/api.config';
import { returnTokenName } from '../utils';
import { createTransport, Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

@Injectable()
export class MailersendService {
  private readonly logger = new Logger(MailersendService.name);

  transporter: Transporter<
    SMTPTransport.SentMessageInfo,
    SMTPTransport.Options
  >;

  constructor(private readonly configService: ApiConfig) {
    this.transporter = createTransport({
      service: 'gmail',
      port: 465,
      secure: true,
      auth: {
        user: this.configService.nodemailerEmail,
        pass: this.configService.nodemailerPassword,
      },
    });
  }

  async sendEmail(
    token: SUPPORTED_TOKENS,
    earlierPrice: bigint,
    latestPrice: bigint,
  ) {
    const info = await this.transporter.sendMail({
      from: 'Yash Sharma',
      to: HYPEHIRE_EMAIL,
      subject: `Price Change - ${returnTokenName(token)}`,
      text: `latest price - ${latestPrice.toString()} earlier price - ${earlierPrice.toString()}`,
    });

    this.logger.log('Message sent: %s', info.messageId);
  }
}
