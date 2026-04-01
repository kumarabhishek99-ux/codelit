import { NextResponse, type NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const authCookie =
    request.cookies.get('sb-knpblkcvsxbprnrhfdrx-auth-token') ||
    request.cookies.get('sb-knpblkcvsxbprnrhfdrx-auth-token.0')
  const isAuthenticated = !!authCookie

  const protectedRoutes = ['/dashboard', '/learn', '/badges']
  const isProtected = protectedRoutes.some(r => pathname.startsWith(r))
  if (isProtected && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  const authRoutes = ['/login', '/signup']
  const isAuth = authRoutes.some(r => pathname.startsWith(r))
  if (isAuth && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
