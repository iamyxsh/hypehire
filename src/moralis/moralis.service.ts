import { Injectable, Logger } from '@nestjs/common';
import { ApiConfig } from 'src/config/api.config';
import EvmApi from '@moralisweb3/evm-api';
import Moralis from 'moralis';
import { SUPPORTED_CHAIN_IDS, SUPPORTED_TOKENS } from 'src/common';
import { ethers } from 'ethers';

@Injectable()
export class MoralisService {
  private evmApi: EvmApi.EvmApi;

  private readonly logger = new Logger(MoralisService.name);

  constructor(private readonly apiConfig: ApiConfig) {
    (async () => {
      await Moralis.start({ apiKey: this.apiConfig.moralisAPIKey });
      this.evmApi = Moralis.EvmApi;
    })();
  }

  async fetchPrice(
    token: SUPPORTED_TOKENS,
    chain: SUPPORTED_CHAIN_IDS,
  ): Promise<bigint> {
    const price = await this.evmApi.token
      .getTokenPrice({
        address: SUPPORTED_TOKENS.ETH,
        chain: SUPPORTED_CHAIN_IDS.ETH_MAINNET,
        exchange: 'uniswap-v3',
        include: 'percent_change',
      })
      .then((res) => res.raw)
      .then((raw) => raw.usdPrice);

    this.logger.log(`Price of ${token} on chain ${chain} -> ${price}`);
    return ethers.parseEther(price.toString());
  }
}
