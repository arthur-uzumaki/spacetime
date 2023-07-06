import { api } from '@/lib/api'
import { URL } from 'next/dist/compiled/@edge-runtime/primitives/url'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  const redirectTo = request.cookies.get('redirecTo')?.value
  const registerResponde = await api.post('/register', {
    code,
  })
  const { token } = registerResponde.data

  const redirectURL = redirectTo ?? new URL('/', request.url)
  const cookieExpiresInSeconds = 60 * 60 * 24 * 30
  return NextResponse.redirect(redirectURL, {
    headers: {
      'Set-Cookie': `token=${token}; Path=/; max-age=${cookieExpiresInSeconds}`,
    },
  })
}
