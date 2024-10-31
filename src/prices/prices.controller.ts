import { Controller, Get, Logger, Param } from '@nestjs/common';
import { PricesService } from './prices.service';
import { SUPPORTED_TOKENS } from '../common';
import { PriceData } from '../entities';
import { ApiParam } from '@nestjs/swagger';

@Controller('prices')
export class PricesController {
  private readonly logger = new Logger(PricesController.name);
  constructor(private readonly pricesService: PricesService) {}

  @ApiParam({
    name: 'tokenAddress',
    example: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  })
  @Get('/:tokenAddress')
  async getPrices(
    @Param('tokenAddress') tokenAddress: SUPPORTED_TOKENS,
  ): Promise<PriceData[]> {
    this.logger.log('Fetching price for => ', tokenAddress);
    return this.pricesService.getPrices(tokenAddress);
  }
}
