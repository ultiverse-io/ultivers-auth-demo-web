import { ParticleProvider } from '@particle-network/provider';
import { getParticleNetwork } from '../utils/particle';
import { AUTH_ORIGIN_MAP } from '../utils/consts';

import { SetupOptions, UserInfo } from './interface';

let options: SetupOptions | null = null;

export const setup = (opts: SetupOptions) => {
  options = {
    env: 'production',
    chain_id: 1,
    ...opts
  };
  getParticleNetwork({
    projectId: options.project_id,
    clientKey: options.client_key,
    appId: options.app_id,
    chainId: options?.chain_id
  });
};

export const redirectToAuth = (redirect_url?: string) => {
  if (options) {
    const { env, state } = options;
    const origin = AUTH_ORIGIN_MAP[env || 'production'];
    window.location.href = `${origin}?state=${state}&clientId=${options.client_id}&redirect_url=${encodeURIComponent(redirect_url || window.location.origin)}`;
  }
};

export const loginWallet = async (wallet_access_token: string) => {
  if (wallet_access_token) {
    const pn = getParticleNetwork();
    const res = await pn?.auth
      .login({
        preferredAuthType: 'jwt',
        account: wallet_access_token,
        hideLoading: true, //optional: hide particle loading when login.
      });
    if (!res) {
      redirectToAuth();
    }
    return res;
  } else {
    redirectToAuth();
  }
}

export const getWalletInfo = () => {
  const pn = getParticleNetwork();
  const isLogin = pn?.auth?.isLogin();
  const particleInfo = pn?.auth?.userInfo();

  if (!isLogin || !particleInfo) {
    return {
      info: null,
      err: 'Please login to the wallet first'
    };
  }

  return {
    info: particleInfo,
    err: null
  }
}

export const getWalletProvider = (userInfo: UserInfo) => {
  const pn = getParticleNetwork();
  const particleWallet = pn?.auth?.wallet();

  if (
    pn &&
    particleWallet &&
    userInfo?.wallets?.gameWallet?.address?.toLocaleLowerCase() === particleWallet?.public_address?.toLocaleLowerCase()
  ) {
    return {
      provider: new ParticleProvider(pn.auth),
      err: null
    }
  }

  return {
    provider: null,
    err: 'Wallet address does not match'
  }
}

export const logoutWallet = async () => {
  const pn = getParticleNetwork();
  return pn ? await pn.auth.logout() : null;
}
