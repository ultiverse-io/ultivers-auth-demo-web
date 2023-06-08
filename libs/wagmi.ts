import { createConfig, configureChains } from 'wagmi'
import { getDefaultWallets } from '@rainbow-me/rainbowkit'
 
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum],
  [
    alchemyProvider({ apiKey: 'r6j4rPRFQqUIyMODxTVdC2-ZckKanxNe' }),
    publicProvider()
  ],
)

const { connectors } = getDefaultWallets({
  appName: 'ultiverse-auth-demo-web',
  chains
})

const config = createConfig({
  autoConnect: false,
  connectors,
  publicClient,
})

export {
  chains,
  config
}
