'use client'

import { useCallback, useEffect, useRef } from 'react'

interface StripeBuyButtonProps {
  buyButtonId: string
  publishableKey: string
  children: React.ReactNode
}

export default function StripeBuyButton({
  buyButtonId,
  publishableKey,
  children,
}: StripeBuyButtonProps) {
  const hiddenRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!document.querySelector('script[src="https://js.stripe.com/v3/buy-button.js"]')) {
      const script = document.createElement('script')
      script.src = 'https://js.stripe.com/v3/buy-button.js'
      script.async = true
      document.head.appendChild(script)
    }

    const container = hiddenRef.current
    if (container) {
      container.innerHTML = ''
      const btn = document.createElement('stripe-buy-button')
      btn.setAttribute('buy-button-id', buyButtonId)
      btn.setAttribute('publishable-key', publishableKey)
      container.appendChild(btn)
    }
  }, [buyButtonId, publishableKey])

  const handleClick = useCallback(() => {
    const stripeEl = hiddenRef.current?.querySelector('stripe-buy-button')
    if (!stripeEl?.shadowRoot) return
    const innerBtn = stripeEl.shadowRoot.querySelector('button')
    innerBtn?.click()
  }, [])

  return (
    <>
      <div ref={hiddenRef} aria-hidden="true" className="absolute w-0 h-0 overflow-hidden opacity-0 pointer-events-none" />
      <div onClick={handleClick} className="cursor-pointer">
        {children}
      </div>
    </>
  )
}
