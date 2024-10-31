import { Controller, Get, Logger, Param, Query } from '@nestjs/common';
import { SwapService } from './swap.service';
import { BigIntTransformPipe } from '../common/pipes';
import { ApiQuery } from '@nestjs/swagger';

@Controller('swap')
export class SwapController {
  private readonly logger = new Logger(SwapController.name);
  constructor(private readonly swapService: SwapService) {}

  @ApiQuery({
    name: 'amount',
    example: '10000000',
    description: 'The amount of Token In you want to exchange.',
  })
  @ApiQuery({
    name: 'tokenOut',
    example: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
    description: 'Address of the Token Out.',
  })
  @ApiQuery({
    name: 'chain',
    example: '0x1',
    description: 'Chain Id of the exchange.',
  })
  @Get(':tokenAddress')
  async getSwapRate(
    @Param('tokenAddress') tokenIn: string,
    @Query('amount', BigIntTransformPipe) amount: bigint,
    @Query('tokenOut') tokenOut: string,
    @Query('chain') chainId: string,
  ) {
    this.logger.log(
      'Calculating amount out for -> ',
      tokenIn,
      amount,
      tokenOut,
      chainId,
    );
    return this.swapService.getSwapRate(chainId, tokenIn, tokenOut, amount);
  }
}
