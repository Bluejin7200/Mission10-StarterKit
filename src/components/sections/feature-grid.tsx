import type { LucideIcon } from "lucide-react"

import { SectionHeading } from "@/components/common/section-heading"
import { Section } from "@/components/layout/section"
import { FeatureCard } from "@/components/sections/feature-card"

export type Feature = {
  icon: LucideIcon
  title: string
  description: string
}

type FeatureGridProps = {
  id?: string
  title: string
  description?: string
  features: Feature[]
}

// 기능 카드 그리드 섹션 (모바일 1열 → 태블릿 2열 → 데스크톱 3열)
export function FeatureGrid({ id, title, description, features }: FeatureGridProps) {
  return (
    <Section id={id} className="border-t">
      <SectionHeading title={title} description={description} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </Section>
  )
}
