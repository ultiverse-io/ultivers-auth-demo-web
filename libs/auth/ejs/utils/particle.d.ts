import { ParticleNetwork } from '@particle-network/auth';
export declare const getParticleNetwork: (options?: {
    projectId: string;
    clientKey: string;
    appId: string;
    chainId?: 1 | 5 | 56 | 97;
}) => ParticleNetwork;
