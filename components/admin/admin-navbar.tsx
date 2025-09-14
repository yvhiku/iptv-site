'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Menu, X, Tv, User, Settings } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function AdminNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { data: session } = useSession()

  return (
    <nav className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/admin" className="flex items-center space-x-2">
            <Tv className="h-8 w-8 text-purple-400" />
            <span className="text-xl font-bold text-white">StreamFlix Admin</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/admin" className="text-gray-300 hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link href="/admin/users" className="text-gray-300 hover:text-white transition-colors">
              Users
            </Link>
            <Link href="/admin/plans" className="text-gray-300 hover:text-white transition-colors">
              Plans
            </Link>
            <Link href="/admin/orders" className="text-gray-300 hover:text-white transition-colors">
              Orders
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span className="text-white">{session?.user?.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
                <DropdownMenuItem className="text-white hover:bg-slate-700">
                  <Link href="/dashboard" className="flex items-center w-full">
                    <Settings className="h-4 w-4 mr-2" />
                    User Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => signOut()}
                  className="text-white hover:bg-slate-700"
                >
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
            <Link href="/admin" className="block text-gray-300 hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link href="/admin/users" className="block text-gray-300 hover:text-white transition-colors">
              Users
            </Link>
            <Link href="/admin/plans" className="block text-gray-300 hover:text-white transition-colors">
              Plans
            </Link>
            <Link href="/admin/orders" className="block text-gray-300 hover:text-white transition-colors">
              Orders
            </Link>
            
            <Button
              onClick={() => signOut()}
              variant="outline"
              className="w-full border-slate-600 text-white hover:bg-slate-800"
            >
              Sign Out
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}