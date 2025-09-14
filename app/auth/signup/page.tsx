import { SignUpForm } from '@/components/auth/signup-form'
import { Navbar } from '@/components/layout/navbar'
import Link from 'next/link'

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />
      
      <div className="flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">
                Create Account
              </h1>
              <p className="text-gray-300">
                Join thousands of satisfied customers worldwide.
              </p>
            </div>
            
            <SignUpForm />
            
            <div className="mt-6 text-center">
              <p className="text-gray-300">
                Already have an account?{' '}
                <Link href="/auth/signin" className="text-purple-400 hover:text-purple-300 font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}