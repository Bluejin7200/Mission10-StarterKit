"use client"

import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useSession } from "@/hooks/use-session"
import { cn } from "@/lib/utils"

// 데스크톱 헤더의 로그인 상태별 버튼 (헤더를 정적으로 유지하려고 클라이언트에서 확인)
export function HeaderAuth() {
  const { user, isPending } = useSession()

  // 확인 전에는 자리만 잡아 레이아웃 흔들림 방지
  if (isPending) return <Skeleton className="hidden h-8 w-36 md:block" />

  // cva는 className을 단순 연결하므로 display 충돌 방지를 위해 cn으로 병합
  if (user) {
    return (
      <Link href="/dashboard" className={cn(buttonVariants(), "hidden md:inline-flex")}>
        대시보드
      </Link>
    )
  }

  return (
    <>
      <Link
        href="/login"
        className={cn(buttonVariants({ variant: "ghost" }), "hidden md:inline-flex")}
      >
        로그인
      </Link>
      <Link href="/signup" className={cn(buttonVariants(), "hidden md:inline-flex")}>
        회원가입
      </Link>
    </>
  )
}
