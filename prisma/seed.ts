import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Clear existing data
  await prisma.userSubscription.deleteMany()
  await prisma.order.deleteMany()
  await prisma.subscriptionPlan.deleteMany()

  // Create subscription plans
  const plans = [
    {
      name: 'Basic Plan',
      description: 'Perfect for individuals who want to get started',
      durationInMonths: 1,
      price: 9.99,
      features: 'HD Quality Streaming,Access to 100+ Channels,24/7 Customer Support,Mobile & Desktop Access',
      isActive: true
    },
    {
      name: 'Premium Plan',
      description: 'Best value for families and power users',
      durationInMonths: 3,
      price: 24.99,
      features: '4K Ultra HD Quality,Access to 500+ Channels,Premium Sports Channels,24/7 Priority Support,Mobile Desktop & TV Access,Multi-device Streaming (3 devices)',
      isActive: true
    },
    {
      name: 'Pro Plan',
      description: 'Ultimate package for the most demanding users',
      durationInMonths: 6,
      price: 49.99,
      features: '4K Ultra HD Quality,Access to 1000+ Channels,All Premium Sports Channels,24/7 VIP Support,All Device Access,Unlimited Multi-device Streaming,Early Access to New Channels,Dedicated Account Manager',
      isActive: true
    },
    {
      name: 'Annual Plan',
      description: 'Best savings with our yearly subscription',
      durationInMonths: 12,
      price: 99.99,
      features: '4K Ultra HD Quality,Access to 1000+ Channels,All Premium Sports Channels,24/7 VIP Support,All Device Access,Unlimited Multi-device Streaming,Early Access to New Channels,Dedicated Account Manager,2 Months Free (Save $20)',
      isActive: true
    }
  ]

  for (const plan of plans) {
    const createdPlan = await prisma.subscriptionPlan.create({
      data: plan
    })
    console.log(`✅ Created plan: ${createdPlan.name}`)
  }

  console.log('🎉 Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
