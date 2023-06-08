import type { Ethereum } from '@wagmi/core'

declare global {
  interface Window {
    ethereum?: Ethereum & {
      isSafePal?: true
      isCoin98?: true
      isBlocto?: true
      isMathWallet?: true
      isTrustWallet?: true
      isBlocto?: true
    }
    BinanceChain?: {
      bnbSign?: (address: string, message: string) => Promise<{ publicKey: string; signature: string }>
      switchNetwork?: (networkId: string) => Promise<string>
    } & Ethereum

    ultiverse_auth_info?: {
      user_info: { uid: string, code: string };
      wallet_access_token: string;
    }
  }
}