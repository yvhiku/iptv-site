'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Check, Star } from 'lucide-react'
import { SubscriptionPlan } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

interface PlanCardProps {
  plan: SubscriptionPlan
  featured?: boolean
}

export function PlanCard({ plan, featured = false }: PlanCardProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async () => {
    if (!session) {
      router.push('/auth/signin')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId: plan.id })
      })

      const { url } = await response.json()
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className={`relative ${
      featured 
        ? 'border-purple-500 bg-gradient-to-b from-purple-900/20 to-slate-800/50' 
        : 'bg-slate-800/50 border-slate-700'
    }`}>
      {featured && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center space-x-1 bg-gradient-to-r from-purple-600 to-blue-600 px-3 py-1 rounded-full text-sm font-medium text-white">
            <Star className="h-4 w-4" />
            <span>Most Popular</span>
          </div>
        </div>
      )}
      
      <CardHeader className="text-center">
        <CardTitle className="text-white text-2xl">
          {plan.name}
        </CardTitle>
        <CardDescription className="text-gray-300">
          {plan.description}
        </CardDescription>
        <div className="mt-4">
          <span className="text-4xl font-bold text-white">
            ${plan.price.toString()}
          </span>
          <span className="text-gray-300 ml-2">
            /{plan.durationInMonths === 1 ? 'month' : `${plan.durationInMonths} months`}
          </span>
        </div>
      </CardHeader>
      
      <CardContent>
        <ul className="space-y-3">
          {plan.features.split(',').map((feature, index) => (
            <li key={index} className="flex items-center space-x-3">
              <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
              <span className="text-gray-300">{feature.trim()}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={handleSubscribe}
          disabled={loading}
          className={`w-full ${
            featured 
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700' 
              : 'bg-slate-700 hover:bg-slate-600'
          }`}
        >
          {loading ? 'Processing...' : 'Subscribe Now'}
        </Button>
      </CardFooter>
    </Card>
  )
}