import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Order, SubscriptionPlan, User } from '@prisma/client'

interface RecentOrdersProps {
  orders: (Order & {
    user: Pick<User, 'name' | 'email'>
    plan: Pick<SubscriptionPlan, 'name'>
  })[]
}

export function RecentOrders({ orders }: RecentOrdersProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-500'
      case 'PENDING':
        return 'bg-yellow-500'
      case 'FAILED':
        return 'bg-red-500'
      case 'REFUNDED':
        return 'bg-gray-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        {orders.length === 0 ? (
          <p className="text-gray-300">No orders found.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="text-white font-medium">{order.user.name || 'Unknown User'}</p>
                      <p className="text-gray-400 text-sm">{order.user.email}</p>
                    </div>
                    <div>
                      <p className="text-white text-sm">{order.plan.name}</p>
                      <p className="text-gray-400 text-xs">{order.createdAt.toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-white font-medium">${order.amount.toString()}</p>
                    <Badge className={`${getStatusColor(order.status)} text-white text-xs`}>
                      {order.status}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}