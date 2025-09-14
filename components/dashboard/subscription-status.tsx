import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, CheckCircle, XCircle } from 'lucide-react'
import { UserSubscription, SubscriptionPlan } from '@prisma/client'

interface SubscriptionStatusProps {
  subscription?: (UserSubscription & { plan: SubscriptionPlan }) | null
  hasCredentials: boolean
}

export function SubscriptionStatus({ subscription, hasCredentials }: SubscriptionStatusProps) {
  if (!subscription) {
    return (
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <XCircle className="h-5 w-5 mr-2 text-red-400" />
            No Active Subscription
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 mb-4">
            You don't have an active subscription yet. Choose a plan to get started.
          </p>
          <a 
            href="/pricing"
            className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-md transition-colors"
          >
            View Plans
          </a>
        </CardContent>
      </Card>
    )
  }

  const isActive = subscription.status === 'ACTIVE' && subscription.endDate > new Date()
  const daysUntilExpiry = Math.ceil((subscription.endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          <div className="flex items-center">
            {isActive ? (
              <CheckCircle className="h-5 w-5 mr-2 text-green-400" />
            ) : (
              <XCircle className="h-5 w-5 mr-2 text-red-400" />
            )}
            Subscription Status
          </div>
          <Badge variant={isActive ? "default" : "destructive"}>
            {subscription.status}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-gray-400 text-sm">Current Plan</p>
            <p className="text-white font-medium">{subscription.plan.name}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Started</p>
            <p className="text-white font-medium flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {subscription.startDate.toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Expires</p>
            <p className="text-white font-medium flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {subscription.endDate.toLocaleDateString()}
            </p>
          </div>
        </div>
        
        {isActive && (
          <div className="bg-green-900/20 border border-green-600/30 rounded-lg p-4">
            <p className="text-green-400 font-medium">
              ✅ Your subscription is active
            </p>
            <p className="text-gray-300 text-sm mt-1">
              {daysUntilExpiry > 0 
                ? `Expires in ${daysUntilExpiry} days`
                : 'Expired'
              }
            </p>
          </div>
        )}
        
        {!isActive && (
          <div className="bg-red-900/20 border border-red-600/30 rounded-lg p-4">
            <p className="text-red-400 font-medium">
              ❌ Your subscription has expired
            </p>
            <p className="text-gray-300 text-sm mt-1">
              Renew your subscription to continue accessing the service.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}