'use client'

import { wagmiAdapter, projectId, networks } from '@/config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createAppKit } from '@reown/appkit/react'
import React, { type ReactNode } from 'react'
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi'

// Set up queryClient
const queryClient = new QueryClient()

// Set up metadata
const metadata = {
  name: 'next-reown-appkit',
  description: 'next-reown-appkit',
  url: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000', // Must match your domain for mobile deeplinks
  icons: ['https://avatars.githubusercontent.com/u/179229932']
}

// Create the modal
export const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks,
  metadata,
  themeMode: 'light',
  features: {
    analytics: false, // Optional - defaults to your Cloud configuration
    email: false, // Disable email login
    socials: [], // Disable social logins
    onramp: false, // Disable onramp
    swaps: false, // Disable swap functionality
    send: false, // Disable send functionality
    history: false, // Disable activity/transaction history
    receive: false // Disable fund wallet/receive functionality
  },
  themeVariables: {
    '--w3m-accent': '#000000',
    '--w3m-font-size-master':'12px'
  },
  // Enable all wallets for better mobile deeplink support
  allWallets: 'SHOW'
})

function ContextProvider({ children, cookies }: { children: ReactNode; cookies: string | null }) {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies)

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}

export default ContextProvider
