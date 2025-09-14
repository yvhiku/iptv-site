import crypto from 'crypto'

interface GeneratedCredentials {
  m3uLink: string
  xtreamUsername: string
  xtreamPassword: string
  portalUrl: string
}

export function generateServiceCredentials(userId: string, planId: string): GeneratedCredentials {
  // Generate unique credentials for the user
  const timestamp = Date.now()
  const randomSuffix = crypto.randomBytes(4).toString('hex')
  
  const xtreamUsername = `user_${userId.slice(-8)}_${randomSuffix}`
  const xtreamPassword = crypto.randomBytes(12).toString('hex')
  
  // In production, these would be your actual IPTV server URLs
  const baseUrl = process.env.IPTV_BASE_URL || 'https://your-iptv-server.com'
  const xtreamBaseUrl = process.env.XTREAM_BASE_URL || 'https://your-xtream-server.com'
  
  return {
    m3uLink: `${baseUrl}/get.php?username=${xtreamUsername}&password=${xtreamPassword}&type=m3u_plus&output=ts`,
    xtreamUsername,
    xtreamPassword,
    portalUrl: `${xtreamBaseUrl}:8080`
  }
}