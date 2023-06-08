export interface SetupOptions {
  project_id: string;
  client_key: string;
  app_id: string;
  client_id: string;
  state: string;
  chain_id?: 1 | 5 | 56 | 97;
  env?: 'development' | 'production';
}

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