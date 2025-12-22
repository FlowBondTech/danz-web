'use client'

import Footer from '@/src/components/Footer'
import Layout from '@/src/components/Layout'
import Navbar from '@/src/components/Navbar'
import DepthAnythingDashboard from '@/src/components/dashboard/DepthAnythingDashboard'

export default function DepthAnythingPage() {
  return (
    <Layout>
      <Navbar />
      <main className="pt-20">
        <section className="section">
          <div className="container">
            <DepthAnythingDashboard />
          </div>
        </section>
      </main>
      <Footer />
    </Layout>
  )
}
