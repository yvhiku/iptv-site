import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    question: "What is IPTV?",
    answer: "IPTV (Internet Protocol Television) is a system where television services are delivered over the internet rather than traditional satellite or cable formats."
  },
  {
    question: "What devices are supported?",
    answer: "Our service works on Smart TVs, Android/iOS devices, computers, streaming boxes, and more. We provide M3U links and XTREAM codes for maximum compatibility."
  },
  {
    question: "Is there a free trial?",
    answer: "We offer a 24-hour free trial for new customers to test our service quality and channel selection."
  },
  {
    question: "How do I get started?",
    answer: "Simply choose a plan, create an account, make payment, and you'll receive your access credentials immediately via email."
  },
  {
    question: "What if I'm not satisfied?",
    answer: "We offer a 7-day money-back guarantee for all new subscriptions if you're not completely satisfied."
  }
]

export function FAQSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-300">
            Got questions? We've got answers.
          </p>
        </div>
        
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-slate-800/50 border border-slate-700 rounded-lg px-6"
            >
              <AccordionTrigger className="text-white hover:text-purple-400">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}