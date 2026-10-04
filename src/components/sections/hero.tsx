import { Container } from "@/components/layout/container"
import { Badge } from "@/components/ui/badge"

type HeroProps = {
  badge?: string
  title: React.ReactNode
  description?: string
  // 버튼 등 행동 유도 요소
  actions?: React.ReactNode
}

// 페이지 최상단 히어로 섹션
export function Hero({ badge, title, description, actions }: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--color-muted),transparent_60%)]"
      />
      <Container className="flex flex-col items-center gap-6 py-20 text-center sm:py-28 lg:py-32">
        {badge && <Badge variant="secondary">{badge}</Badge>}
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="max-w-2xl text-base text-muted-foreground text-pretty sm:text-lg">
            {description}
          </p>
        )}
        {actions && (
          <div className="flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
            {actions}
          </div>
        )}
      </Container>
    </section>
  )
}
