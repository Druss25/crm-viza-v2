import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes } from './routes'
import { getSessionCookie } from 'better-auth/cookies'
import { type NextRequest, NextResponse } from 'next/server'

export async function proxy(request: NextRequest) {
    const session = getSessionCookie(request)

    const isApiAuth = request.nextUrl.pathname.startsWith(apiAuthPrefix)

    const isAuthRoute = () => {
        return authRoutes.some(path =>
            request.nextUrl.pathname.startsWith(path)
        )
    }

    if (isApiAuth) {
        return NextResponse.next()
    }

    if (isAuthRoute()) {
        if (session) {
            return NextResponse.redirect(
                new URL(DEFAULT_LOGIN_REDIRECT, request.url)
            )
        }
        return NextResponse.next()
    }

    if (!session) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'
    ]
}
