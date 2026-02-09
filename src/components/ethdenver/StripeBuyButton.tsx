'use client'

import { useEffect, useRef } from 'react'

interface StripeBuyButtonProps {
  buyButtonId: string
  publishableKey: string
}

export default function StripeBuyButton({ buyButtonId, publishableKey }: StripeBuyButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load Stripe Buy Button script if not already loaded
    if (!document.querySelector('script[src="https://js.stripe.com/v3/buy-button.js"]')) {
      const script = document.createElement('script')
      script.src = 'https://js.stripe.com/v3/buy-button.js'
      script.async = true
      document.head.appendChild(script)
    }

    // Create the stripe-buy-button element
    const container = containerRef.current
    if (container) {
      container.innerHTML = ''
      const btn = document.createElement('stripe-buy-button')
      btn.setAttribute('buy-button-id', buyButtonId)
      btn.setAttribute('publishable-key', publishableKey)
      container.appendChild(btn)
    }
  }, [buyButtonId, publishableKey])

  return <div ref={containerRef} className="w-full [&>stripe-buy-button]:w-full" />
}
