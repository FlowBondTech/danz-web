'use client'

import { PrivyProvider as PrivyProviderBase } from '@privy-io/react-auth'
import type React from 'react'

interface PrivyProviderProps {
  children: React.ReactNode
}

export const PrivyProvider: React.FC<PrivyProviderProps> = ({ children }) => {
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''
  const clientId = process.env.NEXT_PUBLIC_PRIVY_CLIENT_ID

  // Only pass clientId if it's defined and not empty
  const privyConfig: any = {
    appId,
    config: {
      // Email + Farcaster + Google login (miniapp uses Farcaster-only)
      loginMethods: ['email', 'farcaster', 'google'],
      appearance: {
        theme: 'dark',
        accentColor: '#B967FF', // DANZ purple color
        logo: '/danz-icon-white.png', // Use DANZ white logo
        showWalletLoginFirst: false,
      },
    },
  }

  // Only add clientId if it exists and is not empty
  if (clientId && clientId.trim() !== '') {
    privyConfig.clientId = clientId
  }

  return (
    <PrivyProviderBase {...privyConfig}>
      {children}
    </PrivyProviderBase>
  )
}
