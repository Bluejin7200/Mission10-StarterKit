import { NextResponse } from "next/server"

import { apiError, parseBody } from "@/lib/api/response"
import { encodeSession, SESSION_COOKIE, SESSION_MAX_AGE, type Session } from "@/lib/auth/session"
import { loginSchema } from "@/lib/validations/auth"

// 데모 로그인: 형식만 맞으면 어떤 계정이든 로그인 처리
export async function POST(request: Request) {
  const { data, error } = await parseBody(request, loginSchema)
  if (!data) return apiError(error)

  const session: Session = { name: data.email.split("@")[0], email: data.email }
  const response = NextResponse.json({ user: session })
  response.cookies.set(SESSION_COOKIE, encodeSession(session), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: data.remember ? SESSION_MAX_AGE.remember : SESSION_MAX_AGE.default,
  })
  return response
}
