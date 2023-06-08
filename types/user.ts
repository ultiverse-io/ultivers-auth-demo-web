export interface UserInfo {
  id: number;
  username: string;
  nickname?: string;
  email: string | null;
  twitterId?: string | null;
  twitterToken?: string;
  discordId?: string | null;
  discordName?: string;
  dcRefreshToken?: string;
  wallets?: {
    gameWallet: {
      address: string;
    } | null;
    assetWallets: {
      address: string;
    }[] | null;
  }
}