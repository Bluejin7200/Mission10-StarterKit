import { z } from "zod"

// 데모용 세션: 서명 없이 base64url JSON을 쿠키에 저장함
// 실제 서비스에서는 서명/암호화된 토큰(JWT, iron-session 등)이나 인증 서비스로 교체할 것

export const SESSION_COOKIE = "session"

/** 세션 유지 기간 (초) */
export const SESSION_MAX_AGE = {
  default: 60 * 60 * 24, // 1일
  remember: 60 * 60 * 24 * 30, // 30일
}

const sessionSchema = z.object({
  name: z.string(),
  email: z.email(),
})

export type Session = z.infer<typeof sessionSchema>

export function encodeSession(session: Session) {
  return Buffer.from(JSON.stringify(session)).toString("base64url")
}

/** 쿠키 값을 세션으로 복원 (형식이 잘못되면 null) */
export function decodeSession(value: string | undefined): Session | null {
  if (!value) return null
  try {
    const json: unknown = JSON.parse(Buffer.from(value, "base64url").toString())
    const result = sessionSchema.safeParse(json)
    return result.success ? result.data : null
  } catch {
    return null
  }
}

/** 로그인 후 이동할 경로 검증 (외부 URL로의 오픈 리다이렉트 방지) */
export function getSafeRedirect(next: string | null | undefined, fallback = "/dashboard") {
  if (!next || !next.startsWith("/") || next.startsWith("//")) return fallback
  return next
}
