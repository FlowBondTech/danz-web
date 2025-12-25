'use client'

import AuthWrapper from '@/src/components/AuthWrapper'
import { NotificationToast } from '@/src/components/notifications'
import { AuthProvider } from '@/src/contexts/AuthContext'
import { ExperimentalProvider } from '@/src/contexts/ExperimentalContext'
import { NotificationProvider } from '@/src/contexts/NotificationContext'
import { ThemeProvider } from '@/src/contexts/ThemeContext'
import { ApolloProvider } from '@/src/providers/ApolloProvider'
import { PrivyProvider } from '@/src/providers/PrivyProvider'
import type { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ExperimentalProvider>
        <PrivyProvider>
          <ApolloProvider>
            <AuthProvider>
              <NotificationProvider>
                <AuthWrapper>{children}</AuthWrapper>
                <NotificationToast />
              </NotificationProvider>
            </AuthProvider>
          </ApolloProvider>
        </PrivyProvider>
      </ExperimentalProvider>
    </ThemeProvider>
  )
}
