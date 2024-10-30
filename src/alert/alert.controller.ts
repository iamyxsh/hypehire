import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AlertService } from './alert.service';
import { CreateTriggerPriceDto } from './dto/createPriceDto';
import { TriggerData } from 'src/entities/TriggerData';
import { UUID } from 'crypto';

@Controller('alert')
export class AlertController {
  constructor(private readonly alertService: AlertService) {}

  @Post()
  async setPriceTrigger(
    @Body() createTriggerPriceDto: CreateTriggerPriceDto,
  ): Promise<string> {
    return this.alertService.setPriceTrigger(createTriggerPriceDto);
  }

  @Get(':email')
  async getAllPriceTriggerForEmail(
    @Param('email') email: string,
  ): Promise<TriggerData[]> {
    return this.alertService.getAllPriceTriggerForEmail(email);
  }

  @Get(':id')
  async getPriceTriggerById(@Param('id') id: UUID): Promise<TriggerData[]> {
    return this.alertService.getPriceTriggerById(id);
  }
}
