import { IsEmail, IsNumber, IsPositive, IsEnum } from 'class-validator';
import { SUPPORTED_CHAIN_IDS, SUPPORTED_TOKENS } from '../../common';

export class CreateTriggerPriceDto {
  @IsEnum(SUPPORTED_CHAIN_IDS)
  chain: SUPPORTED_CHAIN_IDS;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsEmail()
  email: string;

  @IsEnum(SUPPORTED_TOKENS)
  token: SUPPORTED_TOKENS;
}
