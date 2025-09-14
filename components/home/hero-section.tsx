import { Button } from '@/components/ui/button'
import { Play, Zap, Shield, Globe } from 'lucide-react'
import Link from 'next/link'

export function HeroSection() {
  return (
    <div className="relative overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Premium IPTV
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Streaming Service
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Access thousands of live channels, movies, and TV shows from around the world. 
            Experience premium streaming with crystal-clear quality and reliable service.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              <Play className="mr-2 h-5 w-5" />
              <Link href="/pricing">Start Streaming Now</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
              Learn More
            </Button>
          </div>
          
          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-3">
              <Zap className="h-8 w-8 text-yellow-400" />
              <span className="text-white font-semibold">Lightning Fast</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Shield className="h-8 w-8 text-green-400" />
              <span className="text-white font-semibold">Secure & Reliable</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Globe className="h-8 w-8 text-blue-400" />
              <span className="text-white font-semibold">Global Content</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}