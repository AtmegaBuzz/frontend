// src/wagmi-config.ts
import { createConfig } from '@privy-io/wagmi';
import { http } from 'wagmi';
import { celoAlfajores } from 'wagmi/chains';

// Configure the Celo Alfajores testnet
export const wagmiConfig = createConfig({
  chains: [celoAlfajores], // Add Celo Alfajores testnet
  transports: {
    [celoAlfajores.id]: http('https://alfajores-forno.celo-testnet.org'), // Public RPC URL for Alfajores
  },
});