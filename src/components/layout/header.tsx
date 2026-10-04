import Link from "next/link"

import { Logo } from "@/components/common/logo"
import { Container } from "@/components/layout/container"
import { MainNav } from "@/components/layout/main-nav"
import { MobileNav } from "@/components/layout/mobile-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// cva는 className을 단순 연결하므로 display 충돌 방지를 위해 cn으로 병합
// 상단 고정 헤더: 로고, 데스크톱 내비게이션, 테마 토글, 로그인/대시보드 버튼, 모바일 메뉴
export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
      <Container className="flex h-14 items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <Logo />
          <MainNav />
        </div>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Link
            href="/login"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "hidden md:inline-flex"
            )}
          >
            로그인
          </Link>
          <Link
            href="/dashboard"
            className={cn(buttonVariants(), "hidden md:inline-flex")}
          >
            대시보드
          </Link>
          <MobileNav />
        </div>
      </Container>
    </header>
  )
}
