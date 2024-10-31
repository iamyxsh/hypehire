import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AlertService } from './alert.service';
import { CreateTriggerPriceDto } from './dto/createPriceDto';
import { TriggerData } from 'src/entities/TriggerData';
import { ApiBody, ApiParam } from '@nestjs/swagger';

@Controller('alert')
export class AlertController {
  constructor(private readonly alertService: AlertService) {}

  @ApiBody({ type: CreateTriggerPriceDto })
  @Post()
  async setPriceTrigger(
    @Body() createTriggerPriceDto: CreateTriggerPriceDto,
  ): Promise<string> {
    return this.alertService.setPriceTrigger(createTriggerPriceDto);
  }

  @ApiParam({ name: 'email', example: 'you@example.com' })
  @Get('/email/:email')
  async getAllPriceTriggerForEmail(
    @Param('email') email: string,
  ): Promise<TriggerData[]> {
    return this.alertService.getAllPriceTriggerForEmail(email);
  }

  @ApiParam({ name: 'id', example: 'UUID of the trigger saved.' })
  @Get('/id/:id')
  async getPriceTriggerById(@Param('id') id: string): Promise<TriggerData> {
    return this.alertService.getPriceTriggerById(id);
  }
}
