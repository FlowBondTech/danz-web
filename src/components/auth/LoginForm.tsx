'use client'

import { usePrivy } from '@privy-io/react-auth'
import { motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export const LoginForm = () => {
  const { login, ready, authenticated } = usePrivy()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async () => {
    try {
      setIsLoading(true)
      await login()
    } catch (error) {
      console.error('Login failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (authenticated) {
    router.push('/dashboard')
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto p-8 bg-black/50 backdrop-blur-md rounded-2xl border border-purple-500/20"
    >
      <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
        Welcome Back
      </h2>
      <p className="text-gray-400 text-center mb-8">Login to access your DANZ account</p>

      <button
        onClick={handleLogin}
        disabled={!ready || isLoading}
        className="w-full py-3 px-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {isLoading ? 'Connecting...' : 'Login with Email or Wallet'}
      </button>

      <div className="mt-6 text-center">
        <p className="text-gray-400">
          Don't have an account?{' '}
          <a href="/register" className="text-purple-400 hover:text-purple-300 transition-colors">
            Sign up
          </a>
        </p>
      </div>
    </motion.div>
  )
}
