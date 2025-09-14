import { Card, CardContent } from '@/components/ui/card'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: "John D.",
    rating: 5,
    comment: "Amazing service! Crystal clear quality and so many channels to choose from."
  },
  {
    name: "Sarah M.",
    rating: 5,
    comment: "Been using StreamFlix for 6 months now. Never had any issues, highly recommended!"
  },
  {
    name: "Mike R.",
    rating: 5,
    comment: "Great value for money. The customer support is also very responsive."
  }
]

export function TestimonialsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join thousands of satisfied customers worldwide
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4">"{testimonial.comment}"</p>
                <p className="text-white font-semibold">- {testimonial.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}