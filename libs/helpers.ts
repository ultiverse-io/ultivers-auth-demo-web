import { BigNumber } from "@ethersproject/bignumber";

/**
 * Returns the gas value plus a margin for unexpected or variable gas costs
 * @param value the gas value to pad
 */
export function calculateGasMargin(value: BigNumber): BigNumber {
  return value.mul(120).div(100);
}

export const formatAddress = (address: string) => {
  if (!address) return '-';

  const length = address.length;
  return address.substring(0, 8) + '...' + address.substring(length - 4, length);
};