import { Module } from '@nestjs/common';
import { CronjobsService } from './cronjobs.service';
import { ApiConfig } from 'src/config/api.config';
import { PriceData } from 'src/entities';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MailersendModule } from 'src/mailersend/mailersend.module';
import { MailersendService } from 'src/mailersend/mailersend.service';
import { TriggerData } from 'src/entities/TriggerData';

@Module({
  imports: [
    MikroOrmModule.forFeature([PriceData, TriggerData]),
    MailersendModule,
  ],
  providers: [CronjobsService, ApiConfig, MailersendService],
})
export class CronjobsModule {}
