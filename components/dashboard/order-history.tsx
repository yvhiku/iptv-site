import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Order, SubscriptionPlan } from '@prisma/client'
import { Calendar, DollarSign } from 'lucide-react'

interface OrderHistoryProps {
  orders: (Order & { plan: SubscriptionPlan })[]
}

export function OrderHistory({ orders }: OrderHistoryProps) {
  if (orders.length === 0) {
    return (
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Order History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300">No orders found.</p>
        </CardContent>
      </Card>
    )
  }

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
        <CardTitle className="text-white">Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-slate-700/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-white font-medium">{order.plan.name}</h3>
                  <p className="text-gray-400 text-sm flex items-center mt-1">
                    <Calendar className="h-4 w-4 mr-1" />
                    {order.createdAt.toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium flex items-center">
                    <DollarSign className="h-4 w-4" />
                    {order.amount.toString()}
                  </p>
                  <Badge className={`${getStatusColor(order.status)} text-white mt-1`}>
                    {order.status}
                  </Badge>
                </div>
              </div>
              {order.stripePaymentIntentId && (
                <p className="text-gray-400 text-xs">
                  Order ID: {order.id}
                </p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}