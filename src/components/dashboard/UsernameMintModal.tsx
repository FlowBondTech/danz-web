'use client'

import { useState } from 'react'
import {
  FiX,
  FiAlertTriangle,
  FiCheck,
  FiLoader,
  FiExternalLink,
  FiLock,
  FiShield,
} from 'react-icons/fi'
import { usePrivy, useWallets } from '@privy-io/react-auth'

interface UsernameMintModalProps {
  isOpen: boolean
  onClose: () => void
  username: string
  onSuccess?: () => void
}

type MintStep = 'warning' | 'wallet' | 'confirm' | 'signing' | 'pending' | 'success' | 'error'

export default function UsernameMintModal({
  isOpen,
  onClose,
  username,
  onSuccess,
}: UsernameMintModalProps) {
  const { user, authenticated } = usePrivy()
  const { wallets } = useWallets()
  const [step, setStep] = useState<MintStep>('warning')
  const [error, setError] = useState<string | null>(null)
  const [txHash, setTxHash] = useState<string | null>(null)

  // Get the connected wallet
  const connectedWallet = wallets[0]
  const walletAddress = connectedWallet?.address

  const handleProceedToWallet = () => {
    if (!authenticated || !walletAddress) {
      setStep('wallet')
    } else {
      setStep('confirm')
    }
  }

  const handleMint = async () => {
    if (!connectedWallet) {
      setError('No wallet connected')
      setStep('error')
      return
    }

    setStep('signing')
    setError(null)

    try {
      // Get the provider from the wallet
      const provider = await connectedWallet.getEthereumProvider()

      // For now, we'll simulate the minting process
      // In production, this would call the actual smart contract

      // Simulate signing message
      const message = `Mint username "${username}.danz.eth" to address ${walletAddress}`

      // Request signature
      const signature = await provider.request({
        method: 'personal_sign',
        params: [message, walletAddress],
      })

      setStep('pending')

      // Simulate transaction (in production, this would be a real contract call)
      // For now, we'll call a backend endpoint to record the minting
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/graphql',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `
              mutation MintUsername($input: MintUsernameInput!) {
                mintUsername(input: $input) {
                  success
                  message
                  tx_hash
                  minted_subdomain
                }
              }
            `,
            variables: {
              input: {
                wallet_address: walletAddress,
                chain: 'base',
                signature: signature,
              },
            },
          }),
        }
      )

      const { data, errors } = await response.json()

      if (errors || !data?.mintUsername?.success) {
        throw new Error(data?.mintUsername?.message || errors?.[0]?.message || 'Minting failed')
      }

      setTxHash(data.mintUsername.tx_hash || 'simulated-tx-hash')
      setStep('success')
    } catch (err: any) {
      console.error('Minting error:', err)

      // Check if user rejected the signature
      if (err.code === 4001 || err.message?.includes('rejected')) {
        setError('Transaction was rejected. Please try again.')
      } else {
        setError(err.message || 'Failed to mint username. Please try again.')
      }
      setStep('error')
    }
  }

  const handleClose = () => {
    if (step === 'success') {
      onSuccess?.()
    }
    setStep('warning')
    setError(null)
    setTxHash(null)
    onClose()
  }

  const resetToStart = () => {
    setStep('warning')
    setError(null)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={step !== 'signing' && step !== 'pending' ? handleClose : undefined}
      />

      {/* Modal */}
      <div className="relative bg-bg-secondary border border-neon-purple/30 rounded-2xl w-full max-w-md mx-4 shadow-xl shadow-neon-purple/10">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
            <FiShield className="text-neon-purple" />
            Mint Username
          </h2>
          {step !== 'signing' && step !== 'pending' && (
            <button
              onClick={handleClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <FiX className="text-text-secondary" size={20} />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Step: Warning */}
          {step === 'warning' && (
            <div className="space-y-6">
              <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                <div className="flex items-start gap-3">
                  <FiAlertTriangle className="text-amber-500 mt-0.5 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-bold text-amber-500 text-lg">
                      This Action is PERMANENT
                    </h3>
                    <p className="text-text-secondary text-sm mt-2">
                      Once you mint your username, it <strong className="text-text-primary">cannot be changed</strong>.
                      Your username will be permanently linked to your wallet address on-chain.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-neon-purple/10 border border-neon-purple/30 rounded-xl">
                <p className="text-text-secondary text-sm mb-2">Your username will be minted as:</p>
                <p className="text-2xl font-bold text-neon-purple">
                  {username}.danz.eth
                </p>
              </div>

              <div className="space-y-2 text-sm text-text-secondary">
                <div className="flex items-center gap-2">
                  <FiCheck className="text-green-500" />
                  <span>Permanent on-chain identity</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCheck className="text-green-500" />
                  <span>Unique to you forever</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCheck className="text-green-500" />
                  <span>Works across the DANZ ecosystem</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiLock className="text-amber-500" />
                  <span className="text-amber-500">Cannot be changed after minting</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleClose}
                  className="flex-1 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-text-primary font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleProceedToWallet}
                  className="flex-1 py-3 bg-gradient-to-r from-neon-purple to-neon-pink hover:opacity-90 rounded-xl text-white font-medium transition-opacity"
                >
                  I Understand, Continue
                </button>
              </div>
            </div>
          )}

          {/* Step: Wallet Check */}
          {step === 'wallet' && (
            <div className="space-y-6">
              <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                <div className="flex items-start gap-3">
                  <FiAlertTriangle className="text-blue-500 mt-0.5" size={20} />
                  <div>
                    <h3 className="font-semibold text-blue-500">
                      Wallet Required
                    </h3>
                    <p className="text-sm text-text-secondary mt-1">
                      Please connect a wallet to mint your username. Go to your wallet settings to connect.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={resetToStart}
                  className="flex-1 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-text-primary font-medium transition-colors"
                >
                  Back
                </button>
                <a
                  href="/dashboard/wallet"
                  className="flex-1 py-3 bg-neon-purple hover:bg-neon-purple/80 rounded-xl text-white font-medium transition-colors text-center"
                >
                  Go to Wallet
                </a>
              </div>
            </div>
          )}

          {/* Step: Confirm */}
          {step === 'confirm' && (
            <div className="space-y-6">
              <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-3">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Username</span>
                  <span className="text-neon-purple font-bold">{username}.danz.eth</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Wallet</span>
                  <span className="text-text-primary font-mono text-sm">
                    {walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Network</span>
                  <span className="text-text-primary">Base</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Est. Gas</span>
                  <span className="text-text-primary">~$0.01 - $0.10</span>
                </div>
              </div>

              <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                <p className="text-xs text-amber-500 flex items-center gap-2">
                  <FiAlertTriangle size={14} />
                  This action is irreversible. Your username cannot be changed after minting.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={resetToStart}
                  className="flex-1 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-text-primary font-medium transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleMint}
                  className="flex-1 py-3 bg-gradient-to-r from-neon-purple to-neon-pink hover:opacity-90 rounded-xl text-white font-medium transition-opacity"
                >
                  Mint Now
                </button>
              </div>
            </div>
          )}

          {/* Step: Signing */}
          {step === 'signing' && (
            <div className="space-y-6 text-center py-4">
              <FiLoader className="animate-spin text-neon-purple mx-auto" size={48} />
              <div>
                <h3 className="text-lg font-bold text-text-primary">
                  Waiting for Signature
                </h3>
                <p className="text-text-secondary text-sm mt-2">
                  Please confirm the transaction in your wallet
                </p>
              </div>
            </div>
          )}

          {/* Step: Pending */}
          {step === 'pending' && (
            <div className="space-y-6 text-center py-4">
              <FiLoader className="animate-spin text-neon-purple mx-auto" size={48} />
              <div>
                <h3 className="text-lg font-bold text-text-primary">
                  Minting in Progress
                </h3>
                <p className="text-text-secondary text-sm mt-2">
                  Your username is being minted on-chain. This may take a moment...
                </p>
              </div>
            </div>
          )}

          {/* Step: Success */}
          {step === 'success' && (
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                <FiCheck className="text-green-500" size={32} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-text-primary">
                  Successfully Minted!
                </h3>
                <p className="text-2xl font-bold text-neon-purple mt-2">
                  {username}.danz.eth
                </p>
                <p className="text-text-secondary text-sm mt-2">
                  Your username has been permanently minted on-chain
                </p>
              </div>

              {txHash && txHash !== 'simulated-tx-hash' && (
                <a
                  href={`https://basescan.org/tx/${txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-neon-purple hover:underline text-sm"
                >
                  View on BaseScan
                  <FiExternalLink size={14} />
                </a>
              )}

              <button
                onClick={handleClose}
                className="w-full py-3 bg-gradient-to-r from-neon-purple to-neon-pink hover:opacity-90 rounded-xl text-white font-medium transition-opacity"
              >
                Done
              </button>
            </div>
          )}

          {/* Step: Error */}
          {step === 'error' && (
            <div className="space-y-6">
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                <div className="flex items-start gap-3">
                  <FiAlertTriangle className="text-red-500 mt-0.5" size={20} />
                  <div>
                    <h3 className="font-semibold text-red-500">
                      Minting Failed
                    </h3>
                    <p className="text-sm text-text-secondary mt-1">
                      {error || 'Something went wrong. Please try again.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleClose}
                  className="flex-1 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-text-primary font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={resetToStart}
                  className="flex-1 py-3 bg-neon-purple hover:bg-neon-purple/80 rounded-xl text-white font-medium transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
