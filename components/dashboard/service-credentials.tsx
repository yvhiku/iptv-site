'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Copy, Eye, EyeOff, Link, User, Key, Globe } from 'lucide-react'
import { ServiceCredentials as ServiceCredentialsType } from '@prisma/client'
import { toast } from 'sonner'

interface ServiceCredentialsProps {
  credentials: ServiceCredentialsType
}

export function ServiceCredentials({ credentials }: ServiceCredentialsProps) {
  const [showPassword, setShowPassword] = useState(false)

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success(`${label} copied to clipboard`)
    } catch (error) {
      toast.error('Failed to copy to clipboard')
    }
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Key className="h-5 w-5 mr-2 text-green-400" />
          Your Service Credentials
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* M3U Link */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-gray-400 text-sm font-medium flex items-center">
              <Link className="h-4 w-4 mr-2" />
              M3U Link
            </label>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => copyToClipboard(credentials.m3uLink, 'M3U Link')}
              className="text-purple-400 hover:text-purple-300"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <div className="bg-slate-700 rounded-md p-3 font-mono text-sm text-white break-all">
            {credentials.m3uLink}
          </div>
        </div>

        {/* XTREAM Codes */}
        <div className="border-t border-slate-700 pt-6">
          <h3 className="text-white font-medium mb-4">XTREAM Codes API</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Username */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-gray-400 text-sm font-medium flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Username
                </label>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(credentials.xtreamUsername, 'Username')}
                  className="text-purple-400 hover:text-purple-300"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <div className="bg-slate-700 rounded-md p-3 font-mono text-sm text-white">
                {credentials.xtreamUsername}
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-gray-400 text-sm font-medium flex items-center">
                  <Key className="h-4 w-4 mr-2" />
                  Password
                </label>
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(credentials.xtreamPassword, 'Password')}
                    className="text-purple-400 hover:text-purple-300"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="bg-slate-700 rounded-md p-3 font-mono text-sm text-white">
                {showPassword ? credentials.xtreamPassword : '••••••••••••'}
              </div>
            </div>
          </div>

          {/* Portal URL */}
          <div className="space-y-2 mt-4">
            <div className="flex items-center justify-between">
              <label className="text-gray-400 text-sm font-medium flex items-center">
                <Globe className="h-4 w-4 mr-2" />
                Portal URL
              </label>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(credentials.portalUrl, 'Portal URL')}
                className="text-purple-400 hover:text-purple-300"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <div className="bg-slate-700 rounded-md p-3 font-mono text-sm text-white">
              {credentials.portalUrl}
            </div>
          </div>
        </div>

        {/* Usage Instructions */}
        <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4">
          <p className="text-blue-400 font-medium mb-2">How to use your credentials:</p>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>• Use the M3U link in media players like VLC, Kodi, or IPTV apps</li>
            <li>• Enter XTREAM codes in supported apps for better EPG and VOD</li>
            <li>• Keep your credentials secure and don't share them</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}