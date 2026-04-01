import { NextResponse, type NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const protectedRoutes = ['/dashboard', '/learn', '/badges']
  const isProtected = protectedRoutes.some(r => pathname.startsWith(r))

  if (isProtected) {
    const token = request.cookies.get('sb-access-token')
      ?? request.cookies.getAll().find(c => c.name.includes('auth-token'))

    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
