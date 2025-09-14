import { PlanCard } from '@/components/pricing/plan-card'
import { prisma } from '@/lib/prisma'

export async function FeaturedPlans() {
  const plans = await prisma.subscriptionPlan.findMany({
    where: { isActive: true },
    take: 3,
    orderBy: { price: 'asc' }
  })

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Choose Your Plan
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Select the perfect subscription plan for your streaming needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} featured={false} />
          ))}
        </div>
      </div>
    </section>
  )
}