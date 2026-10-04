import Link from "next/link"
import {
  ArrowRight,
  Layers,
  Moon,
  Palette,
  Rocket,
  ShieldCheck,
  Smartphone,
  Terminal,
} from "lucide-react"

import { FeatureCard } from "@/components/home/feature-card"
import { ToastDemoButton } from "@/components/home/toast-demo-button"
import { Container } from "@/components/layout/container"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// 랜딩 페이지에 노출할 기능 목록
const features = [
  {
    icon: Rocket,
    title: "Next.js App Router",
    description: "서버 컴포넌트와 파일 기반 라우팅으로 빠르게 페이지를 구성합니다.",
  },
  {
    icon: ShieldCheck,
    title: "TypeScript",
    description: "엄격한 타입 검사로 안전하고 유지보수하기 쉬운 코드를 작성합니다.",
  },
  {
    icon: Palette,
    title: "Tailwind CSS",
    description: "유틸리티 클래스와 디자인 토큰으로 일관된 스타일을 유지합니다.",
  },
  {
    icon: Layers,
    title: "shadcn/ui",
    description: "복사해서 소유하는 접근성 높은 컴포넌트를 자유롭게 커스터마이징합니다.",
  },
  {
    icon: Moon,
    title: "다크 모드",
    description: "next-themes 기반 라이트/다크/시스템 테마를 기본 제공합니다.",
  },
  {
    icon: Smartphone,
    title: "반응형 레이아웃",
    description: "모바일 메뉴와 반응형 그리드로 모든 화면 크기에 대응합니다.",
  },
]

export default function Home() {
  return (
    <>
      {/* 히어로 섹션 */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--color-muted),transparent_60%)]"
        />
        <Container className="flex flex-col items-center gap-6 py-20 text-center sm:py-28 lg:py-32">
          <Badge variant="secondary">Next.js · TypeScript · shadcn/ui</Badge>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            아이디어를 가장 빠르게
            <br className="hidden sm:block" /> 웹으로 만드는 스타터킷
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground text-pretty sm:text-lg">
            검증된 기술 스택과 기본 레이아웃이 준비되어 있습니다. 설정은 건너뛰고
            바로 페이지 제작을 시작하세요.
          </p>
          <div className="flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
            <Link
              href="#get-started"
              className={cn(buttonVariants({ size: "lg" }), "px-4")}
            >
              시작하기 <ArrowRight />
            </Link>
            <ToastDemoButton />
          </div>
        </Container>
      </section>

      {/* 기능 섹션 */}
      <section id="features" className="scroll-mt-14 border-t py-16 sm:py-24">
        <Container>
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight">포함된 기능</h2>
            <p className="mt-2 text-muted-foreground">
              프로젝트에 바로 필요한 구성이 갖춰져 있습니다.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </Container>
      </section>

      {/* 시작하기 섹션 */}
      <section id="get-started" className="scroll-mt-14 border-t py-16 sm:py-24">
        <Container className="flex flex-col items-center gap-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight">시작하기</h2>
          <p className="max-w-xl text-muted-foreground">
            개발 서버를 실행하고, 필요한 컴포넌트를 추가하세요.
          </p>
          <div className="w-full max-w-xl space-y-2 rounded-lg border bg-muted/50 p-4 text-left font-mono text-sm">
            <p className="flex items-center gap-2">
              <Terminal className="size-4 shrink-0 text-muted-foreground" />
              <span>npm run dev</span>
            </p>
            <p className="flex items-center gap-2">
              <Terminal className="size-4 shrink-0 text-muted-foreground" />
              <span className="break-all">npx shadcn@latest add dialog</span>
            </p>
          </div>
        </Container>
      </section>
    </>
  )
}
