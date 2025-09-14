import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { DashboardNavbar } from '@/components/dashboard/dashboard-navbar'
import { SubscriptionStatus } from '@/components/dashboard/subscription-status'
import { ServiceCredentials } from '@/components/dashboard/service-credentials'
import { OrderHistory } from '@/components/dashboard/order-history'
import { prisma } from '@/lib/prisma'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/auth/signin')
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      subscriptions: {
        include: { plan: true },
        orderBy: { createdAt: 'desc' }
      },
      orders: {
        include: { plan: true },
        orderBy: { createdAt: 'desc' }
      },
      serviceCredentials: true
    }
  })

  const activeSubscription = user?.subscriptions?.find(
    sub => sub.status === 'ACTIVE' && sub.endDate > new Date()
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <DashboardNavbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-300">
            Manage your subscription and access your streaming credentials.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            <SubscriptionStatus 
              subscription={activeSubscription}
              hasCredentials={!!user?.serviceCredentials}
            />
            
            {activeSubscription && user?.serviceCredentials && (
              <ServiceCredentials credentials={user.serviceCredentials} />
            )}
            
            <OrderHistory orders={user?.orders || []} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {!activeSubscription && (
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                <h3 className="text-white font-semibold mb-4">Get Started</h3>
                <p className="text-gray-300 mb-4">
                  Choose a subscription plan to access thousands of channels.
                </p>
                <a 
                  href="/pricing"
                  className="inline-flex items-center justify-center w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-md transition-colors"
                >
                  View Plans
                </a>
              </div>
            )}
            
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <h3 className="text-white font-semibold mb-4">Need Help?</h3>
              <p className="text-gray-300 mb-4">
                Contact our support team if you have any questions.
              </p>
              <a 
                href="mailto:support@streamflix.com"
                className="text-purple-400 hover:text-purple-300 font-medium"
              >
                support@streamflix.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}