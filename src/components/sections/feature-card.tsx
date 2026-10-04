import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import { ArrowRight } from "lucide-react"

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type FeatureCardProps = {
  icon: LucideIcon
  title: string
  description: string
  // 지정하면 "예제 보기" 링크 표시
  href?: string
}

// 아이콘 + 제목 + 설명으로 구성된 기능 카드
export function FeatureCard({ icon: Icon, title, description, href }: FeatureCardProps) {
  return (
    <Card className="h-full transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="size-5" />
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      {href && (
        <CardFooter className="mt-auto">
          <Link
            href={href}
            className="group/link inline-flex items-center gap-1 text-sm font-medium text-primary"
          >
            예제 보기
            <ArrowRight className="size-4 transition group-hover/link:translate-x-1" />
          </Link>
        </CardFooter>
      )}
    </Card>
  )
}
