import { getAccessToken } from '@privy-io/react-auth'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

export interface CheckoutSessionResponse {
  url: string
  sessionId: string
}

export interface PortalSessionResponse {
  url: string
}

export const stripeService = {
  async createCheckoutSession(
    priceId: string,
    plan: 'monthly' | 'yearly',
  ): Promise<CheckoutSessionResponse> {
    const token = await getAccessToken()

    console.log('api_url', API_URL)

    console.log('plan', plan)

    console.log('priceId', priceId)

    const response = await fetch(`${API_URL}/api/stripe/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ priceId, plan }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to create checkout session')
    }

    return response.json()
  },

  async createPortalSession(): Promise<PortalSessionResponse> {
    const token = await getAccessToken()

    const response = await fetch(`${API_URL}/api/stripe/create-portal-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to create portal session')
    }

    return response.json()
  },
}

export const STRIPE_PRICE_IDS = {
  MONTHLY: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID || '',
  YEARLY: process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID || '',
}
