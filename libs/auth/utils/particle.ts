import { ParticleNetwork, WalletEntryPosition } from '@particle-network/auth';

let particleNetwork: ParticleNetwork | null = null;

const ChainName = {
  1: 'Ethereum',
  5: 'Ethereum',
  56: 'BSC',
  97: 'BSC'
}

export const getParticleNetwork = (options?: { projectId: string; clientKey: string; appId: string; chainId?: 1 | 5 | 56 | 97 }) => {
  if (!particleNetwork && options) {
    const { projectId, clientKey, appId, chainId } = options;
    particleNetwork = new ParticleNetwork({
      projectId,
      clientKey,
      appId,
      chainName: ChainName[chainId || 1], //optional: current chain name, default Ethereum.
      chainId: chainId || 1, //optional: current chain id, default 1.
      wallet: {
        //optional: by default, the wallet entry is displayed in the bottom right corner of the webpage.
        displayWalletEntry: true, //show wallet entry when connect particle.
        defaultWalletEntryPosition: WalletEntryPosition.BR, //wallet entry position
        supportChains: [
          { id: 1, name: 'Ethereum' },
          { id: 5, name: 'Ethereum' },
          { id: 56, name: 'BSC' },
          { id: 97, name: 'BSC' },
        ], // optional: web wallet support chains.
        customStyle: {}, //optional: custom wallet style
      },
    });
  }

  return particleNetwork;
};
