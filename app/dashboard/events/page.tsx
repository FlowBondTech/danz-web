'use client'

import DashboardLayout from '@/src/components/dashboard/DashboardLayout'
import UpcomingEventsGrid from '@/src/components/UpcomingEventsGrid'

export default function EventsPage() {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-2">
            Upcoming Events
          </h1>
          <p className="text-text-secondary">
            Join us at our upcoming events and connect with the DANZ community
          </p>
        </div>

        <UpcomingEventsGrid showTitle={false} />
      </div>
    </DashboardLayout>
  )
}
