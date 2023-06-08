export interface UserEmailParams {
  email: string;
  reset?: boolean
}

export type UserLoginParams = {
  username: string;
  password: string;
  address?: string;
  signature?: string;
  token: string;
} | {
  address: string;
  signature: string;
  username?: string;
  password?: string;
  token: string;
}

export interface UserSignatureParams {
  address: string;
  feature: string;
  chainId: number
}

export interface UserSignUpPasswdParams {
  username: string;
  password: string;
  verifyCode: number;
}

export interface UserUpdateParams {
  twitterId?: string;
  discordId?: string;
}

export interface UserSignUpWalletParams {
  username: string;
  password: string;
  verifyCode: number;
  signature: string;
  address: string;
}

export interface UserCheckParams {
  address: string
}

export interface WalletBindParams {
  signature: string;
  address: string;
  chainId: number;
  type: string;
  particleUid: string;
  particleAuthToken: string;
}

export interface GamesAppointMakeParams {
  gameId: string;
}