'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Menu, X, Tv } from 'lucide-react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { data: session } = useSession()

  return (
    <nav className="relative z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Tv className="h-8 w-8 text-purple-400" />
            <span className="text-xl font-bold text-white">StreamFlix IPTV</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors">
              Pricing
            </Link>
            
            {session ? (
              <div className="flex items-center space-x-4">
                <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">
                  Dashboard
                </Link>
                {session.user.role === 'ADMIN' && (
                  <Link href="/admin" className="text-gray-300 hover:text-white transition-colors">
                    Admin
                  </Link>
                )}
                <Button
                  onClick={() => signOut()}
                  variant="outline"
                  className="border-slate-600 text-white hover:bg-slate-800"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/auth/signin">
                  <Button variant="ghost" className="text-white hover:bg-slate-800">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              onClick={() => setIsOpen(!isOpen)}
              variant="ghost"
              size="sm"
            >
              {isOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link href="/" className="block text-gray-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/pricing" className="block text-gray-300 hover:text-white transition-colors">
              Pricing
            </Link>
            
            {session ? (
              <>
                <Link href="/dashboard" className="block text-gray-300 hover:text-white transition-colors">
                  Dashboard
                </Link>
                {session.user.role === 'ADMIN' && (
                  <Link href="/admin" className="block text-gray-300 hover:text-white transition-colors">
                    Admin
                  </Link>
                )}
                <Button
                  onClick={() => signOut()}
                  variant="outline"
                  className="w-full border-slate-600 text-white hover:bg-slate-800"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <div className="space-y-2">
                <Link href="/auth/signin" className="block">
                  <Button variant="ghost" className="w-full text-white hover:bg-slate-800">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup" className="block">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}