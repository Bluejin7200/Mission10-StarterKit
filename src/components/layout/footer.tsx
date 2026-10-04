import { Container } from "@/components/layout/container"
import { siteConfig } from "@/config/site"

// 하단 푸터
export function Footer() {
  return (
    <footer className="border-t">
      <Container className="flex flex-col items-center justify-between gap-2 py-6 text-sm text-muted-foreground sm:flex-row">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
        <p>Next.js · Tailwind CSS · shadcn/ui</p>
      </Container>
    </footer>
  )
}
