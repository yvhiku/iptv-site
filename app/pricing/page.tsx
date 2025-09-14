import { PlanCard } from '@/components/pricing/plan-card'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { prisma } from '@/lib/prisma'

export default async function PricingPage() {
  const plans = await prisma.subscriptionPlan.findMany({
    where: { isActive: true },
    orderBy: { price: 'asc' }
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />
      
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Choose Your Plan
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Select the perfect subscription plan for your streaming needs. 
              All plans include access to thousands of channels and premium features.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <PlanCard 
                key={plan.id} 
                plan={plan} 
                featured={index === 1} // Middle plan is featured
              />
            ))}
          </div>
          
          {/* Money back guarantee */}
          <div className="text-center mt-16">
            <div className="inline-flex items-center justify-center p-6 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="text-center">
                <h3 className="text-white font-semibold text-lg mb-2">
                  7-Day Money Back Guarantee
                </h3>
                <p className="text-gray-300">
                  Not satisfied? Get a full refund within 7 days of purchase.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}