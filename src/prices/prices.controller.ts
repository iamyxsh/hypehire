import { Controller, Get, Param } from '@nestjs/common';
import { PricesService } from './prices.service';
import { SUPPORTED_TOKENS } from '../common';
import { PriceData } from '../entities';

@Controller('prices')
export class PricesController {
  constructor(private readonly pricesService: PricesService) {}

  @Get('/:tokenAddress')
  async getPrices(
    @Param('tokenAddress') tokenAddress: SUPPORTED_TOKENS,
  ): Promise<PriceData[]> {
    return this.pricesService.getPrices(tokenAddress);
  }
}
