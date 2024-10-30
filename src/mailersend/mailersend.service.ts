import { Injectable } from '@nestjs/common';
import { EMAIL_SENDER, HYPEHIRE_EMAIL, SUPPORTED_TOKENS } from 'src/common';
import { ApiConfig } from 'src/config/api.config';
import { returnTokenName } from 'src/utils';
import { createTransport, Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

@Injectable()
export class MailersendService {
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
        user: configService.nodemailerEmail,
        pass: configService.nodemailerPassword,
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

    console.log('Message sent: %s', info.messageId);
  }
}
