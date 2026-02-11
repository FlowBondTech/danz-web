'use client'

import DashboardLayout from '@/src/components/dashboard/DashboardLayout'
import { useAuth } from '@/src/contexts/AuthContext'
import { useUserPoints } from '@/src/hooks/useReferralData'
import { useWalletBalances } from '@/src/hooks/useWalletBalances'
import { useCreateWallet, useFundWallet, usePrivy, useWallets } from '@privy-io/react-auth'
import { AnimatePresence, motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import {
  FiAlertCircle,
  FiAlertTriangle,
  FiAward,
  FiCheck,
  FiCopy,
  FiDollarSign,
  FiDownload,
  FiExternalLink,
  FiGift,
  FiKey,
  FiLink,
  FiLock,
  FiPlus,
  FiRefreshCw,
  FiShield,
  FiStar,
  FiTrash2,
  FiTrendingUp,
  FiUnlock,
  FiWifi,
  FiX,
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
  const { authenticated, ready, user, linkWallet, unlinkWallet, exportWallet } = usePrivy()
  const { user: authUser } = useAuth()
  const { points, loading: pointsLoading } = useUserPoints(authUser?.username)
  const { wallets: connectedWallets } = useWallets()
  const { createWallet } = useCreateWallet()
  const { fundWallet } = useFundWallet()
  const router = useRouter()
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null)
  const [unlinkingAddress, setUnlinkingAddress] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isCreatingWallet, setIsCreatingWallet] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [exportWarningWallet, setExportWarningWallet] = useState<WalletInfo | null>(null)


  // Get all linked wallets from user object
  const allLinkedWallets: WalletInfo[] =
    user?.linkedAccounts
      ?.filter((account): account is any => account.type === 'wallet')
      .map(wallet => ({
        address: wallet.address,
        chainType: wallet.chainType || 'ethereum',
        walletClient: wallet.walletClientType || 'unknown',
        isEmbedded: wallet.walletClientType === 'privy',
        isConnected: connectedWallets.some(cw => cw.address === wallet.address),
      })) || []

  // Separate embedded and external wallets
  const embeddedWallets = allLinkedWallets.filter(w => w.isEmbedded)
  const linkedWallets = allLinkedWallets.filter(w => !w.isEmbedded)

  // Fetch balances for all wallets
  const walletAddresses = useMemo(
    () => allLinkedWallets.map(w => ({ address: w.address, chainType: w.chainType })),
    [allLinkedWallets],
  )
  const {
    balances,
    isLoading: balancesLoading,
    refetch: refetchBalances,
    getBalance,
  } = useWalletBalances(walletAddresses)

  const copyToClipboard = async (address: string) => {
    await navigator.clipboard.writeText(address)
    setCopiedAddress(address)
    setTimeout(() => setCopiedAddress(null), 2000)
  }

  const handleCreateEmbeddedWallet = async () => {
    if (embeddedWallets.length > 0) {
      setError('You already have an embedded wallet')
      setTimeout(() => setError(null), 3000)
      return
    }

    setIsCreatingWallet(true)
    try {
      await createWallet()
      setSuccess('Embedded wallet created successfully!')
      setTimeout(() => setSuccess(null), 3000)
    } catch (err: any) {
      setError(err.message || 'Failed to create wallet')
      setTimeout(() => setError(null), 3000)
    } finally {
      setIsCreatingWallet(false)
    }
  }

  const showExportWarning = (wallet: WalletInfo) => {
    setExportWarningWallet(wallet)
  }

  const handleExportWallet = async () => {
    if (!exportWarningWallet) return

    const { address, chainType } = exportWarningWallet
    setIsExporting(true)
    setExportWarningWallet(null)

    try {
      // Note: Privy's exportWallet may only support Ethereum embedded wallets
      // Solana export might require a different approach
      await exportWallet({ address })
      setSuccess('Check the Privy modal to export your wallet')
      setTimeout(() => setSuccess(null), 3000)
    } catch (err: any) {
      console.error('Export wallet error:', err)
      if (chainType === 'solana') {
        setError('Solana wallet export may not be supported yet. Contact support for assistance.')
      } else {
        setError(err.message || 'Failed to export wallet')
      }
      setTimeout(() => setError(null), 5000)
    } finally {
      setIsExporting(false)
    }
  }

  const handleFundWallet = async (address: string, chainType: string) => {
    // Privy's fiat on-ramp only supports EVM chains, not Solana
    if (chainType === 'solana') {
      setError(
        'Fiat on-ramp is only available for Ethereum wallets. Use an exchange to fund Solana wallets.',
      )
      setTimeout(() => setError(null), 5000)
      return
    }

    try {
      // First try to find the wallet in connected wallets and use its fund method
      const connectedWallet = connectedWallets.find(w => w.address === address)
      if (connectedWallet && 'fund' in connectedWallet) {
        await (connectedWallet as any).fund()
      } else {
        // Fall back to useFundWallet hook
        await fundWallet({ address })
      }
    } catch (err: any) {
      console.error('Fund wallet error:', err)
      setError(err.message || 'Failed to open funding flow')
      setTimeout(() => setError(null), 3000)
    }
  }

  const handleUnlinkWallet = async (address: string) => {
    const wallet = allLinkedWallets.find(w => w.address === address)
    if (wallet?.isEmbedded) {
      setError('Cannot unlink your embedded wallet')
      setTimeout(() => setError(null), 3000)
      return
    }

    if (allLinkedWallets.length <= 1) {
      setError('Cannot unlink your only wallet')
      setTimeout(() => setError(null), 3000)
      return
    }

    setUnlinkingAddress(address)
    try {
      await unlinkWallet(address)
      setSuccess('Wallet unlinked successfully')
      setTimeout(() => setSuccess(null), 3000)
    } catch (err: any) {
      setError(err.message || 'Failed to unlink wallet')
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
      privy: 'Privy Embedded Wallet',
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
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-neon-purple to-neon-pink flex items-center justify-center shrink-0">
              <FiShield className="w-4 h-4 sm:w-5 sm:h-5 text-text-primary" />
            </div>
            My Wallets
          </h1>
          <p className="text-text-secondary mt-2">
            Manage your embedded and linked wallets for $DANZ rewards and NFT claims
          </p>
        </div>

        {/* DANZ Points Section */}
        <section aria-label="DANZ Points" className="mb-8">
          <div className="bg-gradient-to-r from-neon-purple/20 via-neon-pink/20 to-yellow-500/20 rounded-2xl p-[1px]">
            <div className="bg-bg-secondary rounded-2xl p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 sm:gap-6">
                {/* Points Balance */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg shadow-yellow-500/20 shrink-0">
                    <FiStar
                      className="w-6 h-6 sm:w-8 sm:h-8 text-text-primary"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-text-secondary text-xs sm:text-sm mb-1">
                      DANZ Points Balance
                    </p>
                    {pointsLoading ? (
                      <div className="w-6 h-6 border-2 border-neon-purple border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <p className="text-2xl sm:text-4xl font-bold text-text-primary">
                        {points?.current_points_balance?.toLocaleString() || 0}
                        <span className="text-sm sm:text-lg text-text-secondary ml-1 sm:ml-2">
                          pts
                        </span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Points Stats */}
                <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6">
                  <div className="text-center md:text-right">
                    <div className="flex items-center justify-center md:justify-end gap-1 sm:gap-2 mb-1">
                      <FiTrendingUp
                        className="w-3 h-3 sm:w-4 sm:h-4 text-green-400"
                        aria-hidden="true"
                      />
                      <span className="text-[10px] sm:text-xs text-text-secondary">Earned</span>
                    </div>
                    <p className="text-sm sm:text-lg font-bold text-green-400">
                      {points?.total_points_earned?.toLocaleString() || 0}
                    </p>
                  </div>
                  <div className="text-center md:text-right">
                    <div className="flex items-center justify-center md:justify-end gap-1 sm:gap-2 mb-1">
                      <FiGift
                        className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400"
                        aria-hidden="true"
                      />
                      <span className="text-[10px] sm:text-xs text-text-secondary">Referrals</span>
                    </div>
                    <p className="text-sm sm:text-lg font-bold text-purple-400">
                      {points?.referral_points_earned?.toLocaleString() || 0}
                    </p>
                  </div>
                  <div className="text-center md:text-right">
                    <div className="flex items-center justify-center md:justify-end gap-1 sm:gap-2 mb-1">
                      <FiAward className="w-3 h-3 sm:w-4 sm:h-4 text-red-400" aria-hidden="true" />
                      <span className="text-[10px] sm:text-xs text-text-secondary">Spent</span>
                    </div>
                    <p className="text-sm sm:text-lg font-bold text-red-400">
                      {points?.total_points_spent?.toLocaleString() || 0}
                    </p>
                  </div>
                </div>
              </div>

              {/* Points Info */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <h3 className="text-sm font-medium text-text-primary mb-3">
                  What are DANZ Points?
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-text-secondary">
                    <span className="w-2 h-2 rounded-full bg-green-400" aria-hidden="true" />
                    <span>+20 per referral</span>
                  </div>
                  <div className="flex items-center gap-2 text-text-secondary">
                    <span className="w-2 h-2 rounded-full bg-blue-400" aria-hidden="true" />
                    <span>+5 daily login</span>
                  </div>
                  <div className="flex items-center gap-2 text-text-secondary">
                    <span className="w-2 h-2 rounded-full bg-purple-400" aria-hidden="true" />
                    <span>+10 per session</span>
                  </div>
                  <div className="flex items-center gap-2 text-text-secondary">
                    <span className="w-2 h-2 rounded-full bg-yellow-400" aria-hidden="true" />
                    <span>+50 per event</span>
                  </div>
                </div>
                <p className="mt-3 text-xs text-text-secondary">
                  Points can be redeemed for $DANZ tokens, exclusive NFTs, event discounts, and
                  premium features. Stay tuned!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Alerts */}
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
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 flex items-center gap-2 p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-green-500"
            >
              <FiCheck className="w-5 h-5 flex-shrink-0" />
              <span>{success}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Export Warning Modal */}
        <AnimatePresence>
          {exportWarningWallet && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
              onClick={() => setExportWarningWallet(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={e => e.stopPropagation()}
                className="bg-bg-secondary rounded-2xl border border-red-500/30 p-6 max-w-md w-full shadow-2xl"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                      <FiAlertTriangle className="w-6 h-6 text-red-500" />
                    </div>
                    <h3 className="text-xl font-bold text-text-primary">Security Warning</h3>
                  </div>
                  <button
                    onClick={() => setExportWarningWallet(null)}
                    className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                  >
                    <FiX className="w-5 h-5 text-text-secondary" />
                  </button>
                </div>

                {/* Warning Content */}
                <div className="space-y-4 mb-6">
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                    <p className="text-red-400 font-medium mb-2">⚠️ NEVER share your private key!</p>
                    <ul className="text-sm text-text-secondary space-y-1">
                      <li>• Anyone with your key can steal your funds</li>
                      <li>• DANZ staff will NEVER ask for your key</li>
                      <li>• Store it securely offline (not screenshots)</li>
                      <li>• Don't paste it into websites or apps</li>
                    </ul>
                  </div>

                  <div className="bg-bg-primary rounded-xl p-4">
                    <p className="text-text-secondary text-sm mb-2">Exporting key for:</p>
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2 py-1 text-xs rounded-full ${
                          exportWarningWallet.chainType === 'solana'
                            ? 'bg-purple-500/20 text-purple-400'
                            : 'bg-blue-500/20 text-blue-400'
                        }`}
                      >
                        {exportWarningWallet.chainType === 'solana' ? (
                          <SiSolana className="w-3 h-3" />
                        ) : (
                          <SiEthereum className="w-3 h-3" />
                        )}
                        {exportWarningWallet.chainType === 'solana' ? 'Solana' : 'Ethereum'}
                      </span>
                      <code className="text-text-primary text-sm font-mono">
                        {exportWarningWallet.address.slice(0, 8)}...
                        {exportWarningWallet.address.slice(-6)}
                      </code>
                    </div>
                  </div>

                  {exportWarningWallet.chainType === 'solana' && (
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
                      <p className="text-yellow-400 text-sm">
                        <strong>Note:</strong> Solana wallet export may have limited support. If
                        export fails, contact support for assistance.
                      </p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setExportWarningWallet(null)}
                    className="flex-1 px-4 py-3 bg-bg-primary border border-white/10 text-text-primary rounded-xl font-medium hover:bg-white/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleExportWallet}
                    className="flex-1 px-4 py-3 bg-red-500/20 border border-red-500/30 text-red-400 rounded-xl font-medium hover:bg-red-500/30 transition-colors"
                  >
                    I Understand, Export
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-8">
          <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-3 sm:p-6">
            <p className="text-text-secondary text-xs sm:text-sm mb-1">Total Wallets</p>
            <p className="text-xl sm:text-3xl font-bold text-text-primary">
              {allLinkedWallets.length}
            </p>
          </div>
          <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-3 sm:p-6">
            <p className="text-text-secondary text-xs sm:text-sm mb-1">Connected</p>
            <p className="text-xl sm:text-3xl font-bold text-neon-purple">
              {allLinkedWallets.filter(w => w.isConnected).length}
            </p>
          </div>
          <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-3 sm:p-6 relative">
            <button
              onClick={() => refetchBalances()}
              disabled={balancesLoading}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 p-1.5 sm:p-2 hover:bg-white/5 rounded-lg transition-colors disabled:opacity-50"
              title="Refresh balances"
            >
              <FiRefreshCw
                className={`w-3 h-3 sm:w-4 sm:h-4 text-text-secondary ${balancesLoading ? 'animate-spin' : ''}`}
              />
            </button>
            <p className="text-text-secondary text-xs sm:text-sm mb-1">Embedded</p>
            <p className="text-xl sm:text-3xl font-bold text-neon-pink">{embeddedWallets.length}</p>
          </div>
        </div>

        {/* Embedded Wallet Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
            <FiLock className="text-neon-purple" />
            Embedded Wallet
          </h2>
          <p className="text-text-secondary text-sm mb-4">
            Your secure Privy-managed wallet. Created automatically and secured with your login
            credentials.
          </p>

          {embeddedWallets.length === 0 ? (
            <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-neon-purple/10 flex items-center justify-center mx-auto mb-4">
                <FiKey className="w-8 h-8 text-neon-purple" />
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-2">No Embedded Wallet Yet</h3>
              <p className="text-text-secondary mb-6 max-w-md mx-auto">
                Create a secure embedded wallet managed by Privy. This wallet is automatically
                secured with your login credentials.
              </p>
              <button
                onClick={handleCreateEmbeddedWallet}
                disabled={isCreatingWallet}
                className="px-6 py-3 bg-gradient-to-r from-neon-purple to-neon-pink text-white rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center gap-2 mx-auto disabled:opacity-50"
              >
                {isCreatingWallet ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <FiPlus className="w-5 h-5" />
                    Create Embedded Wallet
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {embeddedWallets.map((wallet, index) => (
                <motion.div
                  key={wallet.address}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-neon-purple/10 to-neon-pink/10 rounded-xl border border-neon-purple/30 p-4 sm:p-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex items-start gap-3 sm:gap-4 min-w-0">
                      {/* Wallet Icon */}
                      <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-neon-purple to-neon-pink flex items-center justify-center shrink-0">
                        <FiShield className="w-5 h-5 sm:w-7 sm:h-7 text-text-primary" />
                      </div>

                      {/* Wallet Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="text-text-primary font-bold text-base sm:text-lg">
                            {getWalletClientDisplay(wallet.walletClient)}
                          </span>
                          <span className="px-2 py-0.5 bg-neon-purple/20 text-neon-purple text-xs rounded-full font-medium">
                            Secure
                          </span>
                          {wallet.isConnected && (
                            <span className="flex items-center gap-1 px-2 py-0.5 bg-green-500/20 text-green-500 text-xs rounded-full">
                              <FiWifi className="w-3 h-3" />
                              Active
                            </span>
                          )}
                        </div>

                        {/* Address */}
                        <div className="flex items-center gap-2 mt-2">
                          <code className="text-text-secondary font-mono bg-black/20 px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm truncate">
                            {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
                          </code>
                          <button
                            onClick={() => copyToClipboard(wallet.address)}
                            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
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
                            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                            title="View on explorer"
                          >
                            <FiExternalLink className="w-4 h-4 text-text-secondary hover:text-text-primary" />
                          </a>
                        </div>

                        {/* Chain Badge */}
                        <div className="mt-3">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs rounded-full font-medium ${
                              wallet.chainType === 'solana'
                                ? 'bg-purple-500/20 text-purple-400'
                                : 'bg-blue-500/20 text-blue-400'
                            }`}
                          >
                            {getWalletIcon(wallet.chainType)}
                            <span className="capitalize">{wallet.chainType}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Balance Display */}
                    <div className="text-left sm:text-right">
                      {balancesLoading ? (
                        <div className="w-6 h-6 border-2 border-neon-purple border-t-transparent rounded-full animate-spin" />
                      ) : getBalance(wallet.address) ? (
                        <div>
                          <p className="text-xl sm:text-2xl font-bold text-text-primary">
                            {getBalance(wallet.address)?.balanceFormatted}
                          </p>
                          <p className="text-xs sm:text-sm text-text-secondary">
                            {getBalance(wallet.address)?.symbol}
                          </p>
                        </div>
                      ) : (
                        <p className="text-text-secondary text-sm">--</p>
                      )}
                    </div>
                  </div>

                  {/* Embedded Wallet Actions */}
                  <div className="mt-4 sm:mt-6 pt-4 border-t border-white/10 grid grid-cols-2 gap-2 sm:gap-3">
                    {wallet.chainType === 'solana' ? (
                      <button
                        onClick={() => copyToClipboard(wallet.address)}
                        className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 rounded-xl font-medium transition-colors text-sm sm:text-base"
                        title="Copy Solana address to receive funds"
                      >
                        {copiedAddress === wallet.address ? (
                          <>
                            <FiCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="hidden sm:inline">Copied!</span>
                            <span className="sm:hidden">Done</span>
                          </>
                        ) : (
                          <>
                            <FiCopy className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="hidden sm:inline">Receive SOL</span>
                            <span className="sm:hidden">Receive</span>
                          </>
                        )}
                      </button>
                    ) : (
                      <button
                        onClick={() => handleFundWallet(wallet.address, wallet.chainType)}
                        className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-green-500/10 hover:bg-green-500/20 text-green-500 rounded-xl font-medium transition-colors text-sm sm:text-base"
                        title="Add funds via card"
                      >
                        <FiDollarSign className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="hidden sm:inline">Add Funds</span>
                        <span className="sm:hidden">Fund</span>
                      </button>
                    )}
                    <button
                      onClick={() => showExportWarning(wallet)}
                      disabled={isExporting}
                      className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-orange-500/10 hover:bg-orange-500/20 text-orange-500 rounded-xl font-medium transition-colors disabled:opacity-50 text-sm sm:text-base"
                    >
                      {isExporting ? (
                        <>
                          <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                          <span className="hidden sm:inline">Exporting...</span>
                          <span className="sm:hidden">...</span>
                        </>
                      ) : (
                        <>
                          <FiDownload className="w-4 h-4 sm:w-5 sm:h-5" />
                          <span className="hidden sm:inline">Export Key</span>
                          <span className="sm:hidden">Export</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Linked External Wallets Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
            <FiUnlock className="text-neon-pink" />
            Linked Wallets
          </h2>
          <p className="text-text-secondary text-sm mb-4">
            External wallets connected to your account. Use these to receive rewards to your
            preferred address.
          </p>

          {linkedWallets.length === 0 ? (
            <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-neon-pink/10 flex items-center justify-center mx-auto mb-4">
                <FiLink className="w-8 h-8 text-neon-pink" />
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-2">
                No External Wallets Linked
              </h3>
              <p className="text-text-secondary mb-6 max-w-md mx-auto">
                Connect your MetaMask, Phantom, or other wallets to receive rewards to your
                preferred address.
              </p>
              <button
                onClick={() => linkWallet()}
                className="px-6 py-3 bg-bg-primary border border-neon-pink/30 text-neon-pink rounded-xl font-medium hover:bg-neon-pink/10 transition-colors flex items-center gap-2 mx-auto"
              >
                <FiLink className="w-5 h-5" />
                Link External Wallet
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {linkedWallets.map((wallet, index) => (
                <motion.div
                  key={wallet.address}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-4 sm:p-6 hover:border-neon-purple/40 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex items-start gap-3 sm:gap-4 min-w-0">
                      {/* Wallet Icon */}
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 ${
                          wallet.chainType === 'solana'
                            ? 'bg-gradient-to-br from-purple-600 to-green-500'
                            : 'bg-gradient-to-br from-blue-600 to-purple-600'
                        }`}
                      >
                        {getWalletIcon(wallet.chainType)}
                      </div>

                      {/* Wallet Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="text-text-primary font-medium text-sm sm:text-base">
                            {getWalletClientDisplay(wallet.walletClient)}
                          </span>
                          {wallet.isConnected && (
                            <span className="flex items-center gap-1 px-2 py-0.5 bg-green-500/20 text-green-500 text-xs rounded-full">
                              <FiWifi className="w-3 h-3" />
                              Connected
                            </span>
                          )}
                        </div>

                        {/* Address */}
                        <div className="flex items-center gap-2">
                          <code className="text-text-secondary text-xs sm:text-sm font-mono truncate">
                            {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
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
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full ${
                              wallet.chainType === 'solana'
                                ? 'bg-purple-500/20 text-purple-400'
                                : 'bg-blue-500/20 text-blue-400'
                            }`}
                          >
                            {getWalletIcon(wallet.chainType)}
                            <span className="capitalize">{wallet.chainType}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Balance + Actions */}
                    <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 w-full sm:w-auto">
                      {/* Balance */}
                      <div className="text-left sm:text-right">
                        {balancesLoading ? (
                          <div className="w-5 h-5 border-2 border-neon-purple/50 border-t-transparent rounded-full animate-spin" />
                        ) : getBalance(wallet.address) ? (
                          <div>
                            <p className="text-base sm:text-lg font-bold text-text-primary">
                              {getBalance(wallet.address)?.balanceFormatted}
                            </p>
                            <p className="text-xs text-text-secondary">
                              {getBalance(wallet.address)?.symbol}
                            </p>
                          </div>
                        ) : (
                          <p className="text-text-secondary text-sm">--</p>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                        {wallet.chainType === 'solana' ? (
                          <button
                            onClick={() => copyToClipboard(wallet.address)}
                            className="p-2 hover:bg-purple-500/10 text-text-secondary hover:text-purple-400 rounded-lg transition-all"
                            title="Copy address to receive SOL"
                          >
                            {copiedAddress === wallet.address ? (
                              <FiCheck className="w-5 h-5 text-green-500" />
                            ) : (
                              <FiCopy className="w-5 h-5" />
                            )}
                          </button>
                        ) : (
                          <button
                            onClick={() => handleFundWallet(wallet.address, wallet.chainType)}
                            className="p-2 hover:bg-green-500/10 text-text-secondary hover:text-green-500 rounded-lg transition-all"
                            title="Fund wallet"
                          >
                            <FiDollarSign className="w-5 h-5" />
                          </button>
                        )}
                        {allLinkedWallets.length > 1 && (
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
                  </div>
                </motion.div>
              ))}

              {/* Link New Wallet Button */}
              <button
                onClick={() => linkWallet()}
                className="w-full p-4 border-2 border-dashed border-neon-purple/30 rounded-xl text-neon-purple hover:bg-neon-purple/5 hover:border-neon-purple/50 transition-all flex items-center justify-center gap-2"
              >
                <FiLink className="w-5 h-5" />
                Link Another Wallet
              </button>
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-6">
          <h3 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
            <FiAlertCircle className="text-neon-purple" />
            Wallet Guide
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-text-primary mb-2 flex items-center gap-2">
                <FiLock className="text-neon-purple" />
                Embedded Wallet
              </h4>
              <ul className="space-y-2 text-text-secondary text-sm">
                <li>Automatically secured with your login</li>
                <li>No seed phrase to remember</li>
                <li>Export private key anytime</li>
                <li>Add funds via card or crypto</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-text-primary mb-2 flex items-center gap-2">
                <FiUnlock className="text-neon-pink" />
                Linked Wallets
              </h4>
              <ul className="space-y-2 text-text-secondary text-sm">
                <li>Connect MetaMask, Phantom, etc.</li>
                <li>Receive rewards to preferred address</li>
                <li>Claim NFTs to any wallet</li>
                <li>Link multiple wallets</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
