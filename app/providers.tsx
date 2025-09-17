'use client'

import AuthWrapper from '@/src/components/AuthWrapper'
import { AuthProvider } from '@/src/contexts/AuthContext'
import { ApolloProvider } from '@/src/providers/ApolloProvider'
import { PrivyProvider } from '@/src/providers/PrivyProvider'
import type { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <PrivyProvider>
      <ApolloProvider>
        <AuthProvider>
          <AuthWrapper>{children}</AuthWrapper>
        </AuthProvider>
      </ApolloProvider>
    </PrivyProvider>
  )
}
