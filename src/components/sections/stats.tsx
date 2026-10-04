import { Section } from "@/components/layout/section"

export type StatItem = {
  label: string
  value: string
}

type StatsProps = {
  items: StatItem[]
}

// 핵심 수치 강조 섹션
export function Stats({ items }: StatsProps) {
  return (
    <Section className="border-t py-12 sm:py-16">
      <dl className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
        {items.map((item) => (
          <div key={item.label} className="flex flex-col gap-1">
            <dt className="text-sm text-muted-foreground">{item.label}</dt>
            <dd className="text-3xl font-bold tracking-tight">{item.value}</dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
