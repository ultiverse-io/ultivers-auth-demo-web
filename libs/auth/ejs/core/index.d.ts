import { ParticleProvider } from '@particle-network/provider';
import { SetupOptions, UserInfo } from './interface';
export declare const setup: (opts: SetupOptions) => void;
export declare const redirectToAuth: (redirect_url?: string) => void;
export declare const loginWallet: (wallet_access_token: string) => Promise<import("@particle-network/auth").UserInfo>;
export declare const getWalletInfo: () => {
    info: any;
    err: string;
} | {
    info: import("@particle-network/auth").UserInfo;
    err: any;
};
export declare const getWalletProvider: (userInfo: UserInfo) => {
    provider: ParticleProvider;
    err: any;
} | {
    provider: any;
    err: string;
};
export declare const logoutWallet: () => Promise<void>;
