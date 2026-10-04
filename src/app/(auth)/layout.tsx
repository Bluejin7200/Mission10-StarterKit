import { Logo } from "@/components/common/logo"

// 인증 영역 레이아웃: 화면 중앙에 로고와 카드 배치
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted/40 px-4 py-10">
      <Logo className="text-lg" />
      {children}
    </main>
  )
}
