import { SignInForm } from '@/components/auth/signin-form'
import { Navbar } from '@/components/layout/navbar'
import Link from 'next/link'

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />
      
      <div className="flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">
                Sign In
              </h1>
              <p className="text-gray-300">
                Welcome back! Please sign in to your account.
              </p>
            </div>
            
            <SignInForm />
            
            <div className="mt-6 text-center">
              <p className="text-gray-300">
                Don't have an account?{' '}
                <Link href="/auth/signup" className="text-purple-400 hover:text-purple-300 font-medium">
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}