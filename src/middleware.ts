import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const PROTECTED_PREFIXES = ['/customer', '/partner']

function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix))
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const hasSession = request.cookies.get('ts_session')?.value === '1'

  if (isProtectedPath(pathname) && !hasSession) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/customer/:path*', '/partner/:path*', '/login', '/register/:path*']
}
