'use client'

import { PrivyProvider as PrivyProviderBase } from '@privy-io/react-auth'
import type React from 'react'

interface PrivyProviderProps {
  children: React.ReactNode
}

export const PrivyProvider: React.FC<PrivyProviderProps> = ({ children }) => {
  return (
    <PrivyProviderBase
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}
      clientId={process.env.NEXT_PUBLIC_PRIVY_CLIENT_ID || ''}
      config={{
        // Only allow email and Google login
        loginMethods: ['email', 'google'],
        appearance: {
          theme: 'dark',
          accentColor: '#B967FF', // DANZ purple color
          logo: '/danz-icon-white.png', // Use DANZ white logo
          showWalletLoginFirst: false,
        },
      }}
    >
      {children}
    </PrivyProviderBase>
  )
}
