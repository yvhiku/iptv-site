import { HeroSection } from '@/components/home/hero-section'
import { FeaturedPlans } from '@/components/home/featured-plans'
import { TestimonialsSection } from '@/components/home/testimonials-section'
import { FAQSection } from '@/components/home/faq-section'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />
      <HeroSection />
      <FeaturedPlans />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </div>
  )
}