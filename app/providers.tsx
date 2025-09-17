'use client'

import { ApolloProvider } from '@/src/providers/ApolloProvider'
import { PrivyProvider } from '@/src/providers/PrivyProvider'
import type { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <PrivyProvider>
      <ApolloProvider>{children}</ApolloProvider>
    </PrivyProvider>
  )
}
