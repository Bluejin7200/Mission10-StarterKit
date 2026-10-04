import { NextResponse, type NextRequest } from "next/server"

import { decodeSession, SESSION_COOKIE } from "@/lib/auth/session"

// 인증이 필요한 경로와 로그인 사용자가 접근할 필요 없는 경로
const AUTH_PAGES = ["/login", "/signup"]

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const session = decodeSession(request.cookies.get(SESSION_COOKIE)?.value)

  // 미인증 사용자가 대시보드 접근 → 로그인 후 원래 경로로 돌아오도록 next 전달
  if (pathname.startsWith("/dashboard") && !session) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("next", pathname + search)
    return NextResponse.redirect(loginUrl)
  }

  // 로그인 사용자가 로그인/회원가입 페이지 접근 → 대시보드로
  if (AUTH_PAGES.includes(pathname) && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup"],
}
