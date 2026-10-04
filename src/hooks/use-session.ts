"use client"

import { useQuery, useQueryClient } from "@tanstack/react-query"

import { sessionQueryOptions } from "@/lib/api/auth"
import type { Session } from "@/lib/auth/session"

// 클라이언트에서 로그인 상태 확인 (정적 페이지에서도 사용 가능)
export function useSession() {
  const { data, isPending } = useQuery(sessionQueryOptions)
  return { user: data ?? null, isPending }
}

// 로그인/로그아웃 직후 세션 캐시를 즉시 갱신
export function useSetSession() {
  const queryClient = useQueryClient()
  return (user: Session | null) =>
    queryClient.setQueryData(sessionQueryOptions.queryKey, { user })
}
