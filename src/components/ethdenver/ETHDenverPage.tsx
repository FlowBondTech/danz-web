'use client'

import BackToTop from '@/src/components/ethdenver/BackToTop'
import CTASection from '@/src/components/ethdenver/CTASection'
import CommunityMissionsSection from '@/src/components/ethdenver/CommunityMissionsSection'
import CoreMissionsSection from '@/src/components/ethdenver/CoreMissionsSection'
import FlowBondIntegrationSection from '@/src/components/ethdenver/FlowBondIntegrationSection'
import HeroSection from '@/src/components/ethdenver/HeroSection'
import LeaderboardRewardsSection from '@/src/components/ethdenver/LeaderboardRewardsSection'
import MissionBoardPreview from '@/src/components/ethdenver/MissionBoardPreview'
import SectionNav from '@/src/components/ethdenver/SectionNav'
import SponsorPacksSection from '@/src/components/ethdenver/SponsorPacksSection'
import ValuePropositionSection from '@/src/components/ethdenver/ValuePropositionSection'

export default function ETHDenverPage() {
  return (
    <>
      <SectionNav />
      <HeroSection />
      <CoreMissionsSection />
      <SponsorPacksSection />
      <MissionBoardPreview />
      <CommunityMissionsSection />
      <LeaderboardRewardsSection />
      <ValuePropositionSection />
      <FlowBondIntegrationSection />
      <CTASection />
      <BackToTop />
    </>
  )
}
