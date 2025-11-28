'use client'

import DashboardLayout from '@/src/components/dashboard/DashboardLayout'
import { usePrivy, useWallets } from '@privy-io/react-auth'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  FiCopy,
  FiExternalLink,
  FiLink,
  FiPlus,
  FiTrash2,
  FiCheck,
  FiAlertCircle,
  FiShield,
  FiWifi,
} from 'react-icons/fi'
import { SiEthereum, SiSolana } from 'react-icons/si'

interface WalletInfo {
  address: string
  chainType: 'ethereum' | 'solana'
  walletClient: string
  isEmbedded: boolean
  isConnected: boolean
}

export default function WalletPage() {
  const { authenticated, ready, user, linkWallet, unlinkWallet } = usePrivy()
  const { wallets: connectedWallets } = useWallets()
  const router = useRouter()
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null)
  const [unlinkingAddress, setUnlinkingAddress] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (ready && !authenticated) {
      router.push('/')
    }
  }, [ready, authenticated, router])

  // Get linked wallets from user object
  const linkedWallets: WalletInfo[] = user?.linkedAccounts
    ?.filter((account): account is any =>
      account.type === 'wallet'
    )
    .map(wallet => ({
      address: wallet.address,
      chainType: wallet.chainType || 'ethereum',
      walletClient: wallet.walletClientType || 'unknown',
      isEmbedded: wallet.walletClientType === 'privy',
      isConnected: connectedWallets.some(cw => cw.address === wallet.address),
    })) || []

  const copyToClipboard = async (address: string) => {
    await navigator.clipboard.writeText(address)
    setCopiedAddress(address)
    setTimeout(() => setCopiedAddress(null), 2000)
  }

  const handleUnlinkWallet = async (address: string) => {
    // Don't allow unlinking embedded wallets
    const wallet = linkedWallets.find(w => w.address === address)
    if (wallet?.isEmbedded) {
      setError("Cannot unlink your embedded wallet")
      setTimeout(() => setError(null), 3000)
      return
    }

    // Don't allow unlinking if it's the only wallet
    if (linkedWallets.length <= 1) {
      setError("Cannot unlink your only wallet")
      setTimeout(() => setError(null), 3000)
      return
    }

    setUnlinkingAddress(address)
    try {
      await unlinkWallet(address)
    } catch (err: any) {
      setError(err.message || "Failed to unlink wallet")
      setTimeout(() => setError(null), 3000)
    } finally {
      setUnlinkingAddress(null)
    }
  }

  const getWalletIcon = (chainType: string) => {
    switch (chainType) {
      case 'solana':
        return <SiSolana className="w-5 h-5" />
      default:
        return <SiEthereum className="w-5 h-5" />
    }
  }

  const getWalletClientDisplay = (client: string) => {
    const clients: Record<string, string> = {
      privy: 'Embedded Wallet',
      metamask: 'MetaMask',
      coinbase_wallet: 'Coinbase Wallet',
      rainbow: 'Rainbow',
      phantom: 'Phantom',
      wallet_connect: 'WalletConnect',
      unknown: 'External Wallet',
    }
    return clients[client] || client
  }

  const getExplorerUrl = (address: string, chainType: string) => {
    if (chainType === 'solana') {
      return `https://solscan.io/account/${address}`
    }
    return `https://etherscan.io/address/${address}`
  }

  if (!ready) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-8 h-8 border-2 border-neon-purple border-t-transparent rounded-full animate-spin" />
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-purple to-neon-pink flex items-center justify-center">
              <FiShield className="w-5 h-5 text-white" />
            </div>
            My Wallets
          </h1>
          <p className="text-text-secondary mt-2">
            Manage your connected wallets for $DANZ rewards and NFT claims
          </p>
        </div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-500"
            >
              <FiAlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-6">
            <p className="text-text-secondary text-sm mb-1">Total Wallets</p>
            <p className="text-3xl font-bold text-text-primary">{linkedWallets.length}</p>
          </div>
          <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-6">
            <p className="text-text-secondary text-sm mb-1">Connected Now</p>
            <p className="text-3xl font-bold text-neon-purple">
              {linkedWallets.filter(w => w.isConnected).length}
            </p>
          </div>
          <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-6">
            <p className="text-text-secondary text-sm mb-1">Embedded Wallets</p>
            <p className="text-3xl font-bold text-neon-pink">
              {linkedWallets.filter(w => w.isEmbedded).length}
            </p>
          </div>
        </div>

        {/* Wallets List */}
        <div className="space-y-4 mb-8">
          {linkedWallets.length === 0 ? (
            <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-neon-purple/10 flex items-center justify-center mx-auto mb-4">
                <FiShield className="w-8 h-8 text-neon-purple" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">No Wallets Linked</h3>
              <p className="text-text-secondary mb-6">
                Link a wallet to receive $DANZ tokens and NFT rewards
              </p>
              <button
                onClick={() => linkWallet()}
                className="px-6 py-3 bg-gradient-to-r from-neon-purple to-neon-pink text-white rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center gap-2 mx-auto"
              >
                <FiPlus className="w-5 h-5" />
                Link Your First Wallet
              </button>
            </div>
          ) : (
            linkedWallets.map((wallet, index) => (
              <motion.div
                key={wallet.address}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-6 hover:border-neon-purple/40 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    {/* Wallet Icon */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      wallet.chainType === 'solana'
                        ? 'bg-gradient-to-br from-purple-600 to-green-500'
                        : 'bg-gradient-to-br from-blue-600 to-purple-600'
                    }`}>
                      {getWalletIcon(wallet.chainType)}
                    </div>

                    {/* Wallet Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-text-primary font-medium">
                          {getWalletClientDisplay(wallet.walletClient)}
                        </span>
                        {wallet.isEmbedded && (
                          <span className="px-2 py-0.5 bg-neon-purple/20 text-neon-purple text-xs rounded-full">
                            Embedded
                          </span>
                        )}
                        {wallet.isConnected && (
                          <span className="flex items-center gap-1 px-2 py-0.5 bg-green-500/20 text-green-500 text-xs rounded-full">
                            <FiWifi className="w-3 h-3" />
                            Connected
                          </span>
                        )}
                      </div>

                      {/* Address */}
                      <div className="flex items-center gap-2">
                        <code className="text-text-secondary text-sm font-mono">
                          {wallet.address.slice(0, 8)}...{wallet.address.slice(-6)}
                        </code>
                        <button
                          onClick={() => copyToClipboard(wallet.address)}
                          className="p-1 hover:bg-white/5 rounded transition-colors"
                          title="Copy address"
                        >
                          {copiedAddress === wallet.address ? (
                            <FiCheck className="w-4 h-4 text-green-500" />
                          ) : (
                            <FiCopy className="w-4 h-4 text-text-secondary hover:text-text-primary" />
                          )}
                        </button>
                        <a
                          href={getExplorerUrl(wallet.address, wallet.chainType)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 hover:bg-white/5 rounded transition-colors"
                          title="View on explorer"
                        >
                          <FiExternalLink className="w-4 h-4 text-text-secondary hover:text-text-primary" />
                        </a>
                      </div>

                      {/* Chain Badge */}
                      <div className="mt-2">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full ${
                          wallet.chainType === 'solana'
                            ? 'bg-purple-500/20 text-purple-400'
                            : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {getWalletIcon(wallet.chainType)}
                          <span className="capitalize">{wallet.chainType}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {!wallet.isEmbedded && linkedWallets.length > 1 && (
                      <button
                        onClick={() => handleUnlinkWallet(wallet.address)}
                        disabled={unlinkingAddress === wallet.address}
                        className="p-2 hover:bg-red-500/10 text-text-secondary hover:text-red-500 rounded-lg transition-all disabled:opacity-50"
                        title="Unlink wallet"
                      >
                        {unlinkingAddress === wallet.address ? (
                          <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <FiTrash2 className="w-5 h-5" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Link New Wallet Button */}
        {linkedWallets.length > 0 && (
          <button
            onClick={() => linkWallet()}
            className="w-full p-4 border-2 border-dashed border-neon-purple/30 rounded-xl text-neon-purple hover:bg-neon-purple/5 hover:border-neon-purple/50 transition-all flex items-center justify-center gap-2"
          >
            <FiLink className="w-5 h-5" />
            Link Another Wallet
          </button>
        )}

        {/* Info Section */}
        <div className="mt-8 bg-bg-secondary rounded-xl border border-neon-purple/20 p-6">
          <h3 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
            <FiAlertCircle className="text-neon-purple" />
            About Wallets
          </h3>
          <div className="space-y-3 text-text-secondary text-sm">
            <p>
              <strong className="text-text-primary">Embedded Wallet:</strong> A secure wallet created by Privy specifically for your account. It's automatically created when you sign up and cannot be unlinked.
            </p>
            <p>
              <strong className="text-text-primary">External Wallets:</strong> Connect wallets like MetaMask, Phantom, or Coinbase Wallet to receive rewards to your preferred address.
            </p>
            <p>
              <strong className="text-text-primary">$DANZ Rewards:</strong> Tokens earned from events, referrals, and achievements will be sent to your linked wallets.
            </p>
            <p>
              <strong className="text-text-primary">NFT Claims:</strong> Event participation NFTs and achievement badges are claimable to any of your linked wallets.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
