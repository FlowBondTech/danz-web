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
      config={{
        loginMethods: ['email', 'wallet', 'google', 'apple'],
        appearance: {
          theme: 'dark',
          accentColor: '#ff6ec7',
          logo: '/logo.png',
          showWalletLoginFirst: false,
        },
      }}
    >
      {children}
    </PrivyProviderBase>
  )
}
