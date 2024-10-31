import { Test, TestingModule } from '@nestjs/testing';
import { SwapController } from './swap.controller';
import { SwapService } from './swap.service';
import { SUPPORTED_CHAIN_IDS, SUPPORTED_TOKENS } from '../common';

describe('SwapController', () => {
  let controller: SwapController;

  const mockSwapService = {
    getSwapRate: jest.fn((tokenAddress, amount, tokenOut, chain) => ({
      amountIn: amount,
      tokenIn: tokenAddress,
      tokenOut,
      amountOutBeforeFee: BigInt(1000),
      amountOutAfterFee: BigInt(997),
      totalFee: BigInt(3),
      chainId: chain,
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SwapController],
      providers: [SwapService],
    })
      .overrideProvider(SwapService)
      .useValue(mockSwapService)
      .compile();

    controller = module.get<SwapController>(SwapController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get the swap rate', async () => {
    expect(controller).toBeDefined();

    const tokenIn = SUPPORTED_TOKENS.ETH;
    const amount = BigInt(1);
    const tokenOut = SUPPORTED_TOKENS.POL;
    const chainId = SUPPORTED_CHAIN_IDS.ETH_MAINNET;

    expect(
      await controller.getSwapRate(tokenIn, amount, tokenOut, chainId),
    ).toBeDefined();

    expect(controller.getSwapRate).toHaveBeenCalledWith(
      chainId,
      tokenIn,
      tokenOut,
      amount,
    );
  });
});
