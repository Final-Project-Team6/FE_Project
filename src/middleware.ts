import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { match } from 'path-to-regexp'

import { getSession } from '@/serverActions/auth' // import { auth } from '@/auth'

const matchersForAuth = [
  '/dashboard/:path*',
  '/myaccount/:path*',
  '/settings/:path*',
  '...',
]

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/seoul-signiel', request.url))
  }
  if (isMatch(request.nextUrl.pathname, matchersForAuth)) {
    return (await getSession()) // 세션 정보 확인
      ? NextResponse.next()
      : NextResponse.redirect(new URL('/signin', request.url))
    // : NextResponse.redirect(new URL(`/signin?callbackUrl=${request.url}`, request.url))
  }

  return NextResponse.next()
}

function isMatch(pathname: string, urls: string[]) {
  return urls.some(url => !!match(url)(pathname))
}

export const config = {
  matcher: [
    /*
     * 아래의 경로는 미들웨어의 필터링을 건너띔:
     * - api/session, api/user (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api/auth/*|font/*|_next/static|_next/image|favicon.ico).*)',
  ],
}
