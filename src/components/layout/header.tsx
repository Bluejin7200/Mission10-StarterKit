import Link from "next/link"
import { Sparkles } from "lucide-react"

import { Container } from "@/components/layout/container"
import { MobileNav } from "@/components/layout/mobile-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { siteConfig } from "@/config/site"

// 상단 고정 헤더: 로고, 데스크톱 내비게이션, 테마 토글, 모바일 메뉴
export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
      <Container className="flex h-14 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Sparkles className="size-5 text-primary" />
          <span>{siteConfig.name}</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          {siteConfig.mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <MobileNav />
        </div>
      </Container>
    </header>
  )
}
