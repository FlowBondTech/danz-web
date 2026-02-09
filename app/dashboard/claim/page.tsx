'use client'

import DashboardLayout from '@/src/components/dashboard/DashboardLayout'
import { usePrivy, useWallets } from '@privy-io/react-auth'
import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  FiAlertCircle,
  FiAward,
  FiCalendar,
  FiCheck,
  FiChevronDown,
  FiClock,
  FiExternalLink,
  FiGift,
  FiStar,
  FiUserPlus,
  FiZap,
} from 'react-icons/fi'
import { SiEthereum, SiSolana } from 'react-icons/si'

// Mock data for claimable rewards - will be replaced with real API data
const mockClaimableTokens = [
  {
    id: '1',
    type: 'event_reward',
    title: 'Salsa Night Participation',
    amount: 50,
    tokenSymbol: '$DANZ',
    event: 'Salsa Night @ Club Tropicana',
    earnedAt: '2024-11-20',
    expiresAt: '2025-02-20',
    status: 'claimable',
  },
  {
    id: '2',
    type: 'referral_bonus',
    title: 'Referral Bonus',
    amount: 100,
    tokenSymbol: '$DANZ',
    referredUser: '@dancequeen',
    earnedAt: '2024-11-15',
    expiresAt: '2025-01-15',
    status: 'claimable',
  },
  {
    id: '3',
    type: 'achievement',
    title: 'First Event Achievement',
    amount: 25,
    tokenSymbol: '$DANZ',
    achievement: 'First Steps',
    earnedAt: '2024-11-10',
    expiresAt: null,
    status: 'claimable',
  },
]

const mockClaimableNFTs = [
  {
    id: 'nft1',
    type: 'event_nft',
    title: 'Salsa Night 2024',
    collection: 'DANZ Events',
    image: '/placeholder-nft.png',
    rarity: 'common',
    event: 'Salsa Night @ Club Tropicana',
    earnedAt: '2024-11-20',
    status: 'claimable',
  },
  {
    id: 'nft2',
    type: 'achievement_badge',
    title: 'Dance Pioneer',
    collection: 'DANZ Achievements',
    image: '/placeholder-badge.png',
    rarity: 'rare',
    achievement: 'Early Adopter',
    earnedAt: '2024-11-01',
    status: 'claimable',
  },
]

const mockClaimedHistory = [
  {
    id: 'claimed1',
    type: 'token',
    title: 'Sign Up Bonus',
    amount: 100,
    tokenSymbol: '$DANZ',
    claimedAt: '2024-10-15',
    txHash: '0x123...abc',
    walletAddress: '0xabc...def',
  },
]

export default function ClaimPage() {
  const { authenticated, ready, user } = usePrivy()
  const { wallets } = useWallets()
  const router = useRouter()

  const [activeTab, setActiveTab] = useState<'tokens' | 'nfts' | 'history'>('tokens')
  const [selectedWallet, setSelectedWallet] = useState<string>('')
  const [showWalletDropdown, setShowWalletDropdown] = useState(false)
  const [claimingId, setClaimingId] = useState<string | null>(null)
  const [claimedItems, setClaimedItems] = useState<string[]>([])
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [successDetails, setSuccessDetails] = useState<any>(null)

  useEffect(() => {
    if (ready && !authenticated) {
      router.push('/')
    }
  }, [ready, authenticated, router])

  // Get linked wallets
  const linkedWallets =
    user?.linkedAccounts
      ?.filter((account): account is any => account.type === 'wallet')
      .map(wallet => ({
        address: wallet.address,
        chainType: wallet.chainType || 'ethereum',
        isEmbedded: wallet.walletClientType === 'privy',
      })) || []

  // Set default wallet
  useEffect(() => {
    if (linkedWallets.length > 0 && !selectedWallet) {
      setSelectedWallet(linkedWallets[0].address)
    }
  }, [linkedWallets, selectedWallet])

  const handleClaim = async (itemId: string, itemType: 'token' | 'nft') => {
    if (!selectedWallet) {
      return
    }

    setClaimingId(itemId)

    // Simulate claim process - replace with real API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    setClaimedItems(prev => [...prev, itemId])
    setClaimingId(null)

    // Show success modal
    const item =
      itemType === 'token'
        ? mockClaimableTokens.find(t => t.id === itemId)
        : mockClaimableNFTs.find(n => n.id === itemId)

    setSuccessDetails({
      ...item,
      itemType,
      walletAddress: selectedWallet,
      txHash: '0x' + Math.random().toString(16).slice(2, 10) + '...',
    })
    setShowSuccessModal(true)
  }

  const handleClaimAll = async () => {
    if (!selectedWallet) return

    setClaimingId('all')
    await new Promise(resolve => setTimeout(resolve, 3000))

    const tokenIds = mockClaimableTokens.map(t => t.id)
    setClaimedItems(prev => [...prev, ...tokenIds])
    setClaimingId(null)

    const totalAmount = mockClaimableTokens.reduce((sum, t) => sum + t.amount, 0)
    setSuccessDetails({
      title: 'All Tokens Claimed',
      amount: totalAmount,
      tokenSymbol: '$DANZ',
      itemType: 'token',
      walletAddress: selectedWallet,
      txHash: '0x' + Math.random().toString(16).slice(2, 10) + '...',
    })
    setShowSuccessModal(true)
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary':
        return 'from-yellow-500 to-orange-500 text-yellow-500'
      case 'epic':
        return 'from-purple-500 to-pink-500 text-purple-500'
      case 'rare':
        return 'from-blue-500 to-cyan-500 text-blue-500'
      default:
        return 'from-gray-500 to-gray-600 text-gray-400'
    }
  }

  const availableTokens = mockClaimableTokens.filter(t => !claimedItems.includes(t.id))
  const availableNFTs = mockClaimableNFTs.filter(n => !claimedItems.includes(n.id))
  const totalClaimableAmount = availableTokens.reduce((sum, t) => sum + t.amount, 0)

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
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-purple to-neon-pink flex items-center justify-center">
              <FiGift className="w-5 h-5 text-text-primary" />
            </div>
            Claim Rewards
          </h1>
          <p className="text-text-secondary mt-2">
            Claim your earned $DANZ tokens and NFTs from events and achievements
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-neon-purple/20 to-neon-pink/20 rounded-xl border border-neon-purple/30 p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <FiZap className="w-5 h-5 text-neon-purple" />
              <span className="text-text-secondary text-sm">Claimable Tokens</span>
            </div>
            <p className="text-3xl font-bold text-text-primary">
              {totalClaimableAmount} <span className="text-neon-purple text-lg">$DANZ</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <FiAward className="w-5 h-5 text-neon-pink" />
              <span className="text-text-secondary text-sm">Claimable NFTs</span>
            </div>
            <p className="text-3xl font-bold text-text-primary">{availableNFTs.length}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <FiStar className="w-5 h-5 text-yellow-500" />
              <span className="text-text-secondary text-sm">Total Claimed</span>
            </div>
            <p className="text-3xl font-bold text-text-primary">
              {mockClaimedHistory.reduce((sum, h) => sum + (h.amount || 0), 0)}{' '}
              <span className="text-text-secondary text-lg">$DANZ</span>
            </p>
          </motion.div>
        </div>

        {/* Wallet Selector */}
        {linkedWallets.length === 0 ? (
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <FiAlertCircle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-yellow-500 font-medium mb-1">No Wallet Connected</h3>
                <p className="text-text-secondary text-sm mb-4">
                  You need to link a wallet to claim your rewards.
                </p>
                <Link
                  href="/dashboard/wallet"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/20 text-yellow-500 rounded-lg hover:bg-yellow-500/30 transition-colors"
                >
                  Link Wallet
                  <FiExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-4 mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-text-secondary text-sm">Claim to:</span>
                <div className="relative">
                  <button
                    onClick={() => setShowWalletDropdown(!showWalletDropdown)}
                    className="flex items-center gap-2 px-4 py-2 bg-bg-primary rounded-lg border border-neon-purple/20 hover:border-neon-purple/40 transition-colors"
                  >
                    {linkedWallets.find(w => w.address === selectedWallet)?.chainType ===
                    'solana' ? (
                      <SiSolana className="w-4 h-4 text-purple-400" />
                    ) : (
                      <SiEthereum className="w-4 h-4 text-blue-400" />
                    )}
                    <code className="text-text-primary text-sm">
                      {selectedWallet.slice(0, 6)}...{selectedWallet.slice(-4)}
                    </code>
                    <FiChevronDown
                      className={`w-4 h-4 text-text-secondary transition-transform ${showWalletDropdown ? 'rotate-180' : ''}`}
                    />
                  </button>

                  <AnimatePresence>
                    {showWalletDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 mt-2 w-64 bg-bg-secondary border border-neon-purple/20 rounded-xl shadow-xl z-10 overflow-hidden"
                      >
                        {linkedWallets.map(wallet => (
                          <button
                            key={wallet.address}
                            onClick={() => {
                              setSelectedWallet(wallet.address)
                              setShowWalletDropdown(false)
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors ${
                              selectedWallet === wallet.address ? 'bg-neon-purple/10' : ''
                            }`}
                          >
                            {wallet.chainType === 'solana' ? (
                              <SiSolana className="w-4 h-4 text-purple-400" />
                            ) : (
                              <SiEthereum className="w-4 h-4 text-blue-400" />
                            )}
                            <div className="flex-1 text-left">
                              <code className="text-text-primary text-sm">
                                {wallet.address.slice(0, 8)}...{wallet.address.slice(-6)}
                              </code>
                              {wallet.isEmbedded && (
                                <span className="ml-2 text-xs text-neon-purple">(Embedded)</span>
                              )}
                            </div>
                            {selectedWallet === wallet.address && (
                              <FiCheck className="w-4 h-4 text-neon-purple" />
                            )}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {availableTokens.length > 1 && activeTab === 'tokens' && (
                <button
                  onClick={handleClaimAll}
                  disabled={claimingId !== null}
                  className="px-6 py-2 bg-gradient-to-r from-neon-purple to-neon-pink text-white rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {claimingId === 'all' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Claiming All...
                    </>
                  ) : (
                    <>
                      <FiZap className="w-4 h-4" />
                      Claim All ({totalClaimableAmount} $DANZ)
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {(['tokens', 'nfts', 'history'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-neon-purple to-neon-pink text-white'
                  : 'bg-bg-secondary text-text-secondary hover:text-text-primary border border-neon-purple/20'
              }`}
            >
              {tab === 'tokens' && `Tokens (${availableTokens.length})`}
              {tab === 'nfts' && `NFTs (${availableNFTs.length})`}
              {tab === 'history' && 'Claim History'}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'tokens' && (
            <motion.div
              key="tokens"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {availableTokens.length === 0 ? (
                <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-neon-purple/10 flex items-center justify-center mx-auto mb-4">
                    <FiZap className="w-8 h-8 text-neon-purple" />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-2">No Tokens to Claim</h3>
                  <p className="text-text-secondary">
                    Participate in events and refer friends to earn $DANZ tokens!
                  </p>
                </div>
              ) : (
                availableTokens.map((token, index) => (
                  <motion.div
                    key={token.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-6 hover:border-neon-purple/40 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-center gap-4 min-w-0">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                            token.type === 'event_reward'
                              ? 'bg-gradient-to-br from-blue-500 to-purple-500'
                              : token.type === 'referral_bonus'
                                ? 'bg-gradient-to-br from-green-500 to-teal-500'
                                : 'bg-gradient-to-br from-yellow-500 to-orange-500'
                          }`}
                        >
                          {token.type === 'event_reward' && (
                            <FiCalendar className="w-5 h-5 text-text-primary" />
                          )}
                          {token.type === 'referral_bonus' && (
                            <FiUserPlus className="w-5 h-5 text-text-primary" />
                          )}
                          {token.type === 'achievement' && (
                            <FiAward className="w-5 h-5 text-text-primary" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-text-primary font-medium truncate">{token.title}</h3>
                          <p className="text-text-secondary text-sm truncate">
                            {token.event || token.referredUser || token.achievement}
                          </p>
                          <div className="flex items-center gap-2 mt-1 flex-wrap">
                            <FiClock className="w-3 h-3 text-text-secondary shrink-0" />
                            <span className="text-text-secondary text-xs">
                              Earned {new Date(token.earnedAt).toLocaleDateString()}
                            </span>
                            {token.expiresAt && (
                              <span className="text-yellow-500 text-xs">
                                • Expires {new Date(token.expiresAt).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 justify-between sm:justify-end w-full sm:w-auto shrink-0">
                        <div className="text-left sm:text-right">
                          <p className="text-2xl font-bold text-neon-purple">{token.amount}</p>
                          <p className="text-text-secondary text-sm">{token.tokenSymbol}</p>
                        </div>
                        <button
                          onClick={() => handleClaim(token.id, 'token')}
                          disabled={claimingId !== null || !selectedWallet}
                          className="px-4 py-2 bg-gradient-to-r from-neon-purple to-neon-pink text-white rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shrink-0"
                        >
                          {claimingId === token.id ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              Claiming...
                            </>
                          ) : (
                            'Claim'
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          )}

          {activeTab === 'nfts' && (
            <motion.div
              key="nfts"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {availableNFTs.length === 0 ? (
                <div className="col-span-full bg-bg-secondary rounded-xl border border-neon-purple/20 p-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-neon-pink/10 flex items-center justify-center mx-auto mb-4">
                    <FiAward className="w-8 h-8 text-neon-pink" />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-2">No NFTs to Claim</h3>
                  <p className="text-text-secondary">
                    Attend events and complete achievements to earn NFT badges!
                  </p>
                </div>
              ) : (
                availableNFTs.map((nft, index) => (
                  <motion.div
                    key={nft.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-bg-secondary rounded-xl border border-neon-purple/20 overflow-hidden hover:border-neon-purple/40 transition-all"
                  >
                    {/* NFT Image Placeholder */}
                    <div
                      className={`h-48 bg-gradient-to-br ${getRarityColor(nft.rarity).split(' ').slice(0, 2).join(' ')} flex items-center justify-center relative`}
                    >
                      <div className="absolute inset-0 bg-black/30" />
                      <FiAward className="w-16 h-16 text-text-primary/80 relative z-10" />
                      <div
                        className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium bg-black/50 ${getRarityColor(nft.rarity).split(' ').slice(2).join(' ')}`}
                      >
                        {nft.rarity.toUpperCase()}
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-text-primary font-bold text-lg">{nft.title}</h3>
                          <p className="text-text-secondary text-sm">{nft.collection}</p>
                        </div>
                      </div>

                      <p className="text-text-secondary text-sm mb-4">
                        {nft.event || nft.achievement}
                      </p>

                      <button
                        onClick={() => handleClaim(nft.id, 'nft')}
                        disabled={claimingId !== null || !selectedWallet}
                        className="w-full px-4 py-3 bg-gradient-to-r from-neon-purple to-neon-pink text-white rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {claimingId === nft.id ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Claiming NFT...
                          </>
                        ) : (
                          <>
                            <FiGift className="w-4 h-4" />
                            Claim NFT
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          )}

          {activeTab === 'history' && (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {mockClaimedHistory.length === 0 ? (
                <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-gray-500/10 flex items-center justify-center mx-auto mb-4">
                    <FiClock className="w-8 h-8 text-gray-500" />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-2">No Claim History</h3>
                  <p className="text-text-secondary">Your claimed rewards will appear here.</p>
                </div>
              ) : (
                mockClaimedHistory.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-6"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center shrink-0">
                          <FiCheck className="w-5 h-5 text-green-500" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-text-primary font-medium truncate">{item.title}</h3>
                          <div className="flex items-center gap-2 mt-1 flex-wrap">
                            <span className="text-text-secondary text-sm">
                              Claimed {new Date(item.claimedAt).toLocaleDateString()}
                            </span>
                            <span className="text-text-secondary hidden sm:inline">•</span>
                            <a
                              href={`https://etherscan.io/tx/${item.txHash}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-neon-purple text-sm hover:underline flex items-center gap-1"
                            >
                              View TX
                              <FiExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="text-left sm:text-right shrink-0">
                        <p className="text-xl font-bold text-green-500">+{item.amount}</p>
                        <p className="text-text-secondary text-sm">{item.tokenSymbol}</p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success Modal */}
        <AnimatePresence>
          {showSuccessModal && successDetails && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowSuccessModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={e => e.stopPropagation()}
                className="bg-bg-secondary rounded-2xl border border-neon-purple/30 p-8 max-w-md w-full text-center"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-6">
                  <FiCheck className="w-10 h-10 text-text-primary" />
                </div>

                <h2 className="text-2xl font-bold text-text-primary mb-2">Successfully Claimed!</h2>

                <p className="text-text-secondary mb-6">
                  {successDetails.itemType === 'token' ? (
                    <>
                      <span className="text-3xl font-bold text-neon-purple">
                        {successDetails.amount}
                      </span>
                      <span className="text-text-primary ml-2">{successDetails.tokenSymbol}</span>
                    </>
                  ) : (
                    <span className="text-xl font-bold text-neon-pink">{successDetails.title}</span>
                  )}
                </p>

                <div className="bg-bg-primary rounded-xl p-4 mb-6 text-left">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-text-secondary">Sent to</span>
                    <code className="text-text-primary">
                      {successDetails.walletAddress?.slice(0, 8)}...
                      {successDetails.walletAddress?.slice(-6)}
                    </code>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Transaction</span>
                    <a
                      href={`https://etherscan.io/tx/${successDetails.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neon-purple hover:underline flex items-center gap-1"
                    >
                      {successDetails.txHash}
                      <FiExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="w-full px-6 py-3 bg-gradient-to-r from-neon-purple to-neon-pink text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
                >
                  Done
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  )
}
