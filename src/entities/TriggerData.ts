import { Entity, Property, PrimaryKey, Enum } from '@mikro-orm/core';
import { SUPPORTED_CHAIN_IDS, SUPPORTED_TOKENS } from 'src/common';

@Entity()
export class TriggerData {
  @PrimaryKey()
  uuid: string;

  @Property()
  chain: SUPPORTED_CHAIN_IDS;

  @Property()
  email: string;

  @Property()
  triggerPrice: string;

  @Enum({ items: () => SUPPORTED_TOKENS, nativeEnumName: 'token' })
  token: SUPPORTED_TOKENS;
}
