import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import { generateServiceCredentials } from '@/lib/credentials-generator'

export async function POST(request: Request) {
  try {
    const body = await request.text()
    const signature = headers().get('stripe-signature')

    if (!signature) {
      return NextResponse.json(
        { error: 'No signature' },
        { status: 400 }
      )
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object
      const userId = session.metadata?.userId
      const planId = session.metadata?.planId

      if (!userId || !planId) {
        console.error('Missing metadata in webhook')
        return NextResponse.json(
          { error: 'Missing metadata' },
          { status: 400 }
        )
      }

      // Get the plan details
      const plan = await prisma.subscriptionPlan.findUnique({
        where: { id: planId }
      })

      if (!plan) {
        console.error('Plan not found')
        return NextResponse.json(
          { error: 'Plan not found' },
          { status: 404 }
        )
      }

      // Update order status
      await prisma.order.update({
        where: { stripeSessionId: session.id },
        data: {
          status: 'COMPLETED',
          stripePaymentIntentId: session.payment_intent as string
        }
      })

      // Calculate subscription dates
      const startDate = new Date()
      const endDate = new Date()
      endDate.setMonth(endDate.getMonth() + plan.durationInMonths)

      // Create or update user subscription
      await prisma.userSubscription.upsert({
        where: { userId },
        update: {
          planId,
          startDate,
          endDate,
          status: 'ACTIVE'
        },
        create: {
          userId,
          planId,
          startDate,
          endDate,
          status: 'ACTIVE'
        }
      })

      // Generate and store service credentials
      const credentials = generateServiceCredentials(userId, planId)
      
      await prisma.serviceCredentials.upsert({
        where: { userId },
        update: credentials,
        create: {
          userId,
          ...credentials
        }
      })

      console.log(`Subscription activated for user ${userId}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}