import { Controller, Get, Param, Query } from '@nestjs/common';
import { SwapService } from './swap.service';
import { BigIntTransformPipe } from '../common/pipes';

@Controller('swap')
export class SwapController {
  constructor(private readonly swapService: SwapService) {}

  @Get(':tokenAddress')
  async getSwapRate(
    @Param('tokenAddress') tokenIn: string,
    @Query('amount', BigIntTransformPipe) amount: bigint,
    @Query('tokenOut') tokenOut: string,
    @Query('chain') chainId: string,
  ) {
    return this.swapService.getSwapRate(chainId, tokenIn, tokenOut, amount);
  }
}
