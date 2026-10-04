import { NextResponse } from "next/server"

import { getSession } from "@/lib/auth/get-session"

// 현재 로그인 사용자 조회 (정적 페이지의 헤더가 클라이언트에서 로그인 상태를 확인할 때 사용)
export async function GET() {
  const user = await getSession()
  return NextResponse.json({ user }, { headers: { "Cache-Control": "no-store" } })
}
