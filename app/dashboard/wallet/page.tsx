'use client'

import DashboardLayout from '@/src/components/dashboard/DashboardLayout'
import { usePrivy, useWallets, useCreateWallet, useFundWallet } from '@privy-io/react-auth'
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
  FiDownload,
  FiDollarSign,
  FiKey,
  FiLock,
  FiUnlock,
  FiAlertTriangle,
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

  useEffect(() => {
    if (ready && !authenticated) {
      router.push('/')
    }
  }, [ready, authenticated, router])

  // Get all linked wallets from user object
  const allLinkedWallets: WalletInfo[] = user?.linkedAccounts
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

  // Separate embedded and external wallets
  const embeddedWallets = allLinkedWallets.filter(w => w.isEmbedded)
  const linkedWallets = allLinkedWallets.filter(w => !w.isEmbedded)

  const copyToClipboard = async (address: string) => {
    await navigator.clipboard.writeText(address)
    setCopiedAddress(address)
    setTimeout(() => setCopiedAddress(null), 2000)
  }

  const handleCreateEmbeddedWallet = async () => {
    if (embeddedWallets.length > 0) {
      setError("You already have an embedded wallet")
      setTimeout(() => setError(null), 3000)
      return
    }

    setIsCreatingWallet(true)
    try {
      await createWallet()
      setSuccess("Embedded wallet created successfully!")
      setTimeout(() => setSuccess(null), 3000)
    } catch (err: any) {
      setError(err.message || "Failed to create wallet")
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
      setSuccess("Check the Privy modal to export your wallet")
      setTimeout(() => setSuccess(null), 3000)
    } catch (err: any) {
      console.error('Export wallet error:', err)
      if (chainType === 'solana') {
        setError("Solana wallet export may not be supported yet. Contact support for assistance.")
      } else {
        setError(err.message || "Failed to export wallet")
      }
      setTimeout(() => setError(null), 5000)
    } finally {
      setIsExporting(false)
    }
  }

  const handleFundWallet = async (address: string, chainType: string) => {
    // Privy's fiat on-ramp only supports EVM chains, not Solana
    if (chainType === 'solana') {
      setError("Fiat on-ramp is only available for Ethereum wallets. Use an exchange to fund Solana wallets.")
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
      setError(err.message || "Failed to open funding flow")
      setTimeout(() => setError(null), 3000)
    }
  }

  const handleUnlinkWallet = async (address: string) => {
    const wallet = allLinkedWallets.find(w => w.address === address)
    if (wallet?.isEmbedded) {
      setError("Cannot unlink your embedded wallet")
      setTimeout(() => setError(null), 3000)
      return
    }

    if (allLinkedWallets.length <= 1) {
      setError("Cannot unlink your only wallet")
      setTimeout(() => setError(null), 3000)
      return
    }

    setUnlinkingAddress(address)
    try {
      await unlinkWallet(address)
      setSuccess("Wallet unlinked successfully")
      setTimeout(() => setSuccess(null), 3000)
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
          <h1 className="text-3xl font-bold text-text-primary flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-purple to-neon-pink flex items-center justify-center">
              <FiShield className="w-5 h-5 text-white" />
            </div>
            My Wallets
          </h1>
          <p className="text-text-secondary mt-2">
            Manage your embedded and linked wallets for $DANZ rewards and NFT claims
          </p>
        </div>

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
                onClick={(e) => e.stopPropagation()}
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
                      <span className={`inline-flex items-center gap-1.5 px-2 py-1 text-xs rounded-full ${
                        exportWarningWallet.chainType === 'solana'
                          ? 'bg-purple-500/20 text-purple-400'
                          : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {exportWarningWallet.chainType === 'solana' ? (
                          <SiSolana className="w-3 h-3" />
                        ) : (
                          <SiEthereum className="w-3 h-3" />
                        )}
                        {exportWarningWallet.chainType === 'solana' ? 'Solana' : 'Ethereum'}
                      </span>
                      <code className="text-text-primary text-sm font-mono">
                        {exportWarningWallet.address.slice(0, 8)}...{exportWarningWallet.address.slice(-6)}
                      </code>
                    </div>
                  </div>

                  {exportWarningWallet.chainType === 'solana' && (
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
                      <p className="text-yellow-400 text-sm">
                        <strong>Note:</strong> Solana wallet export may have limited support. If export fails, contact support for assistance.
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-6">
            <p className="text-text-secondary text-sm mb-1">Total Wallets</p>
            <p className="text-3xl font-bold text-text-primary">{allLinkedWallets.length}</p>
          </div>
          <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-6">
            <p className="text-text-secondary text-sm mb-1">Connected Now</p>
            <p className="text-3xl font-bold text-neon-purple">
              {allLinkedWallets.filter(w => w.isConnected).length}
            </p>
          </div>
          <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-6">
            <p className="text-text-secondary text-sm mb-1">Embedded Wallets</p>
            <p className="text-3xl font-bold text-neon-pink">
              {embeddedWallets.length}
            </p>
          </div>
        </div>

        {/* Embedded Wallet Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
            <FiLock className="text-neon-purple" />
            Embedded Wallet
          </h2>
          <p className="text-text-secondary text-sm mb-4">
            Your secure Privy-managed wallet. Created automatically and secured with your login credentials.
          </p>

          {embeddedWallets.length === 0 ? (
            <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-neon-purple/10 flex items-center justify-center mx-auto mb-4">
                <FiKey className="w-8 h-8 text-neon-purple" />
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-2">No Embedded Wallet Yet</h3>
              <p className="text-text-secondary mb-6 max-w-md mx-auto">
                Create a secure embedded wallet managed by Privy. This wallet is automatically secured with your login credentials.
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
                  className="bg-gradient-to-br from-neon-purple/10 to-neon-pink/10 rounded-xl border border-neon-purple/30 p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      {/* Wallet Icon */}
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-neon-purple to-neon-pink flex items-center justify-center">
                        <FiShield className="w-7 h-7 text-white" />
                      </div>

                      {/* Wallet Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-text-primary font-bold text-lg">
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
                          <code className="text-text-secondary font-mono bg-black/20 px-3 py-1 rounded-lg">
                            {wallet.address.slice(0, 10)}...{wallet.address.slice(-8)}
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
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs rounded-full font-medium ${
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
                  </div>

                  {/* Embedded Wallet Actions */}
                  <div className="mt-6 pt-4 border-t border-white/10 grid grid-cols-2 gap-3">
                    {wallet.chainType === 'solana' ? (
                      <button
                        onClick={() => copyToClipboard(wallet.address)}
                        className="flex items-center justify-center gap-2 px-4 py-3 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 rounded-xl font-medium transition-colors"
                        title="Copy Solana address to receive funds"
                      >
                        {copiedAddress === wallet.address ? (
                          <>
                            <FiCheck className="w-5 h-5" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <FiCopy className="w-5 h-5" />
                            Receive SOL
                          </>
                        )}
                      </button>
                    ) : (
                      <button
                        onClick={() => handleFundWallet(wallet.address, wallet.chainType)}
                        className="flex items-center justify-center gap-2 px-4 py-3 bg-green-500/10 hover:bg-green-500/20 text-green-500 rounded-xl font-medium transition-colors"
                        title="Add funds via card"
                      >
                        <FiDollarSign className="w-5 h-5" />
                        Add Funds
                      </button>
                    )}
                    <button
                      onClick={() => showExportWarning(wallet)}
                      disabled={isExporting}
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-orange-500/10 hover:bg-orange-500/20 text-orange-500 rounded-xl font-medium transition-colors disabled:opacity-50"
                    >
                      {isExporting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                          Exporting...
                        </>
                      ) : (
                        <>
                          <FiDownload className="w-5 h-5" />
                          Export Key
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
            External wallets connected to your account. Use these to receive rewards to your preferred address.
          </p>

          {linkedWallets.length === 0 ? (
            <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-neon-pink/10 flex items-center justify-center mx-auto mb-4">
                <FiLink className="w-8 h-8 text-neon-pink" />
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-2">No External Wallets Linked</h3>
              <p className="text-text-secondary mb-6 max-w-md mx-auto">
                Connect your MetaMask, Phantom, or other wallets to receive rewards to your preferred address.
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
