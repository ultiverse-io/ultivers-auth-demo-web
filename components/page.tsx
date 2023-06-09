import clsx from 'clsx'
import { ethers } from 'ethers'
import { useMemo, useEffect, useState, useCallback } from 'react';
import { JsonView, defaultStyles } from 'react-json-view-lite'
import { useRouter } from 'next/router'
import { WagmiConfig, useAccount } from 'wagmi'
import { RainbowKitProvider, useConnectModal } from '@rainbow-me/rainbowkit'
import { config, chains } from 'libs/wagmi'
import { fetchUserInfo, loginByCode, logoutAccount } from 'libs/auth'
import { redirectToAuth, getWalletInfo, loginWallet, getWalletProvider } from 'libs/auth/core'
import { formatAddress, calculateGasMargin } from 'libs/helpers'
import { disconnect } from '@wagmi/core'
import { test_chain_id } from 'libs/consts';

import ABI from 'config/abi.json';

import { UserInfo } from 'types/user'

const test_contract_address = '0x01473449eccc0D33c49fDcBDee8f1FE8fd2B8F18';

let active_address = '';

const Component = () => {
  const router = useRouter();
  const { openConnectModal } = useConnectModal();
  const { connector } = useAccount();

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(false);

  const wallets = useMemo(() => {
    const l: { type: 'game' | 'asset'; address: string }[] = [];

    if (userInfo?.wallets?.gameWallet && !l.find((item) => item.address === userInfo?.wallets?.gameWallet?.address)) {
      l.push({ type: 'game', address: userInfo.wallets.gameWallet.address });
    }

    if (userInfo?.wallets?.assetWallets) {
      userInfo.wallets.assetWallets.forEach((w) => {
        if (!l.find((item) => item.address === w.address)) l.push({ type: 'asset', address: w.address });
      });
    }
    return l;
  }, [userInfo]);

  const updateUserInfo = async () => {
    const data = await fetchUserInfo()
    setUserInfo(data);
  }

  const init = async (query: Record<string, string>) => {
    const { userInfo: user_info, wallet_access_token } = query;
    if (user_info && wallet_access_token) {
      window.ultiverse_auth_info = {
        user_info: JSON.parse(user_info),
        wallet_access_token
      };

      setLoading(true);

      const { success } = await loginByCode();

      if (success) {
        await updateUserInfo();
      }

      const { info } = getWalletInfo();
      if (!info) {
        await loginWallet(wallet_access_token);
      }

      setLoading(false);
      router.replace('/');
      return;
    }

    await updateUserInfo();
  }

  const mintByGameWallet = useCallback(async () => {
    if (userInfo) {
      const { provider, err } = getWalletProvider(userInfo);
      if (provider) {
        mint(provider);
      } else {
        console.log(err);
      }
    }
  }, [userInfo]);

  const mintByAssetWallet = useCallback(async (address: string) => {
    await disconnect();
    active_address = address;
    if (openConnectModal) {
      openConnectModal();
    } else {
      setTimeout(() => mintByAssetWallet(address), 1000);
    }
  }, []);

  const mint = useCallback(async (provider: any) => {
    const ethersProvider = new ethers.providers.Web3Provider(provider, 'any');
    const ethersSigner = ethersProvider.getSigner();
    const contract = new ethers.Contract(test_contract_address, ABI, ethersSigner);
    const estimate = contract.estimateGas.mint;
    const method = contract.mint;
    try {
      const estimatedGasLimit = await estimate();
      const tx = await method({
        gasLimit: calculateGasMargin(estimatedGasLimit),
      });
      const res = await tx.wait();
      console.log(res);
    } catch (e) {
      console.error(e);
    }
  }, [])

  const logout = async () => {
    logoutAccount();
    setUserInfo(null);
    disconnect();
    active_address = '';
  }

  useEffect(() => {
    init(router.query as Record<string, string>);
  }, [router.query]);

  useEffect(() => {
    if (connector) {
      Promise.all([
        connector.getAccount(),
        connector.getChainId(),
        connector.getProvider()
      ]).then(([address, chainId, provider]) => {
        if (address === active_address && chainId === test_chain_id && provider) {
          mint(provider);
        } else {
          console.error('Wallet address does not match');
        }
      })
    }
  }, [connector]);

  return (
    <div className='h-screen overflow-auto'>
      {userInfo ? (
        <div className='flex items-center px-16 min-h-full w-full flex-col'>
          <div className='flex items-center flex-col mt-8'>
            <h1 className='mb-2 text-lg'>User Info: </h1>
            <JsonView data={userInfo} shouldInitiallyExpand={(level) => false} style={defaultStyles} />
          </div>
          <div className='flex items-center flex-col mt-8'>
            <h1 className='mb-1 text-lg'>Send Transaction: </h1>
            <p className='mb-2 text-sm'>Select your Wallet</p>
            {wallets.map((w) => (
              <button
                key={w.address}
                type='button'
                className={
                  clsx(
                    'mt-2 inline-flex justify-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 hover:ring-gray-600'
                  )
                }
                onClick={w.type === 'game' ? mintByGameWallet : () => mintByAssetWallet(w.address)}
              >
                {formatAddress(w.address)}({w.type})
              </button>
            ))}
            <button
              type='button'
              className={
                clsx(
                  'mt-8 inline-flex w-full justify-center rounded-md bg-red-600 px-12 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:w-auto mx-6'
                )
              }
              onClick={() => logout()}
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className='flex justify-center items-center h-full'>
          <button
            type='button'
            className={
              clsx(
                loading ? 'cursor-not-allowed' : '',
                'inline-flex w-full justify-center rounded-md bg-blue-600 px-12 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:w-auto mx-6'
              )
            }
            onClick={!loading ? (() => redirectToAuth()) : undefined}
          >
            Login
          </button>
        </div>
      )}
    </div>
  )
}

const Page = () => {
  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={chains} initialChain={test_chain_id}>
        <Component />
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default Page
