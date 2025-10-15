'use client'

import {
  ApolloClient,
  ApolloLink,
  ApolloProvider as ApolloProviderBase,
  InMemoryCache,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { createHttpLink } from '@apollo/client/link/http'
import { usePrivy } from '@privy-io/react-auth'
import type React from 'react'
import { useMemo } from 'react'

// Cache configuration with proper field policies
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        me: {
          read(existing) {
            return existing
          },
        },
        events: {
          keyArgs: ['filter', 'sortBy', 'organizerId'],
          merge(existing, incoming, { args }) {
            if (!existing || args?.pagination?.offset === 0) {
              return incoming
            }

            if (args?.pagination?.offset > 0) {
              const existingEventsMap = new Map()

              for (const event of existing.events || []) {
                existingEventsMap.set(event.id || event.__ref, event)
              }

              for (const event of incoming.events || []) {
                const eventId = event.id || event.__ref
                if (!existingEventsMap.has(eventId)) {
                  existingEventsMap.set(eventId, event)
                }
              }

              return {
                ...incoming,
                events: Array.from(existingEventsMap.values()),
              }
            }

            return incoming
          },
        },
        users: {
          keyArgs: ['filter'],
          merge(existing, incoming, { args }) {
            if (!existing) return incoming
            if (args?.pagination?.offset === 0) return incoming

            return {
              ...incoming,
              users: [...(existing.users || []), ...(incoming.users || [])],
            }
          },
        },
      },
    },
    User: {
      keyFields: ['privy_id'],
    },
    Event: {
      keyFields: ['id'],
      fields: {
        is_registered: {
          read(existing) {
            return existing ?? false
          },
        },
      },
    },
    EventRegistration: {
      keyFields: ['id'],
    },
    DanceBond: {
      keyFields: ['id'],
    },
  },
})

interface ApolloProviderProps {
  children: React.ReactNode
}

export const ApolloProvider: React.FC<ApolloProviderProps> = ({ children }) => {
  const { getAccessToken } = usePrivy()

  const client = useMemo(() => {
    // HTTP link for GraphQL endpoint
    const httpLink = createHttpLink({
      uri: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/graphql`,
    })

    // Authentication link
    const authLink = setContext(async (_, { headers }) => {
      try {
        const token = await getAccessToken()
        return {
          headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
          },
        }
      } catch (error) {
        console.warn('Failed to get auth token:', error)
        return { headers }
      }
    })

    // Error handling link
    const errorLink = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        for (const { message, locations, path, extensions } of graphQLErrors) {
          console.error(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          )

          if (extensions?.code === 'UNAUTHENTICATED') {
            // Handle unauthenticated error
            window.location.href = '/login'
          } else if (extensions?.code === 'FORBIDDEN') {
            console.error('Access denied')
          }
        }
      }

      if (networkError) {
        console.error(`[Network error]: ${networkError}`)
      }
    })

    // Create Apollo Client
    return new ApolloClient({
      link: ApolloLink.from([errorLink, authLink, httpLink]),
      cache,
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'cache-first',
          nextFetchPolicy: 'cache-first',
          errorPolicy: 'all',
        },
        query: {
          fetchPolicy: 'cache-first',
          errorPolicy: 'all',
        },
        mutate: {
          errorPolicy: 'all',
        },
      },
    })
  }, [getAccessToken])

  return <ApolloProviderBase client={client}>{children}</ApolloProviderBase>
}

export { cache }
