import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { SectionHeading } from "@/components/common/section-heading"
import { Section } from "@/components/layout/section"
import { Stagger, StaggerItem } from "@/components/motion/stagger"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { exampleCount, exampleFeatures } from "@/config/examples"

export const metadata: Metadata = {
  title: "예제",
  description: "스타터킷에 포함된 기능별 동작 예제와 소스 코드",
}

// 예제 목록: 기능 카드 그리드
export default function ExamplesPage() {
  return (
    <Section>
      <SectionHeading
        title="기능별 예제"
        description={`${exampleFeatures.length}개 기능, ${exampleCount}개 예제를 직접 조작해보고 코드를 복사해 사용하세요.`}
      />
      <Stagger immediate className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {exampleFeatures.map((feature) => (
          <StaggerItem key={feature.slug}>
            <Link href={`/examples/${feature.slug}`} className="group block h-full">
              <Card className="h-full transition-shadow group-hover:shadow-md">
                <CardHeader>
                  <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <feature.icon className="size-5" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto justify-between text-sm text-muted-foreground">
                  <span>예제 {feature.examples.length}개</span>
                  <ArrowRight className="size-4 transition group-hover:translate-x-1 group-hover:text-primary" />
                </CardFooter>
              </Card>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  )
}
