import { DIFFERENCE_PERCENTAGE, SUPPORTED_TOKENS } from 'src/common';

export function isDifferenceGreaterThanThresholdBigInt(
  num1: bigint,
  num2: bigint,
  thresholdPercent: number = DIFFERENCE_PERCENTAGE,
): boolean {
  const difference = num1 > num2 ? num1 - num2 : num2 - num1;
  const threshold =
    (BigInt(thresholdPercent) * BigInt(100) * (num1 < num2 ? num1 : num2)) /
    BigInt(10000);
  return difference > threshold;
}

export function returnTokenName(token: SUPPORTED_TOKENS): 'ETH' | 'POL' {
  switch (token) {
    case SUPPORTED_TOKENS.ETH:
      return 'ETH';
    case SUPPORTED_TOKENS.POL:
      return 'POL';
  }
}
