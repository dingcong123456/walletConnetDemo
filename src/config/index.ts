import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet, arbitrum } from '@reown/appkit/networks'
import type { AppKitNetwork } from '@reown/appkit/networks'

import { defineChain } from '@reown/appkit/networks';

// Define Gode Chain network using defineChain
const godeChain = defineChain({
  id: 5500,
  name: 'Gode Chain',
  chainNamespace: 'eip155',
  caipNetworkId: 'eip155:5500',
  nativeCurrency: {
    name: 'Gode',
    symbol: 'GODE',
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.godechain.com']
    }
  },
  blockExplorers: {
    default: {
      name: 'Gode Explorer',
      url: 'https://explorer.godechain.com'
    }
  }
})

// Get projectId from https://dashboard.reown.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || "e6cad6c3a0cc8e164520d42fc2cda3b2" // this is a public projectId only to use on localhost

if (!projectId) {
  throw new Error('Project ID is not defined')
}

export const networks = [mainnet, arbitrum, godeChain] as [AppKitNetwork, ...AppKitNetwork[]]

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  ssr: true,
  projectId,
  networks
})

export const config = wagmiAdapter.wagmiConfig