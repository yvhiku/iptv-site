import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { AdminNavbar } from '@/components/admin/admin-navbar'
import { DashboardStats } from '@/components/admin/dashboard-stats'
import { RecentOrders } from '@/components/admin/recent-orders'
import { prisma } from '@/lib/prisma'

export default async function AdminPage() {
  const session = await getServerSession(authOptions)
  
  if (!session || session.user.role !== 'ADMIN') {
    redirect('/dashboard')
  }

  // Get dashboard statistics
  const [totalUsers, totalSubscriptions, totalOrders, totalRevenue] = await Promise.all([
    prisma.user.count(),
    prisma.userSubscription.count({
      where: { status: 'ACTIVE' }
    }),
    prisma.order.count(),
    prisma.order.aggregate({
      where: { status: 'COMPLETED' },
      _sum: { amount: true }
    })
  ])

  // Get recent orders
  const recentOrders = await prisma.order.findMany({
    take: 10,
    include: {
      user: { select: { name: true, email: true } },
      plan: { select: { name: true } }
    },
    orderBy: { createdAt: 'desc' }
  })

  const stats = {
    totalUsers,
    totalSubscriptions,
    totalOrders,
    totalRevenue: Number(totalRevenue._sum.amount || 0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <AdminNavbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-300">
            Manage your IPTV service users, plans, and orders.
          </p>
        </div>

        <div className="space-y-8">
          <DashboardStats stats={stats} />
          <RecentOrders orders={recentOrders} />
        </div>
      </div>
    </div>
  )
}