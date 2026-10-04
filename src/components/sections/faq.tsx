import { SectionHeading } from "@/components/common/section-heading"
import { Section } from "@/components/layout/section"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export type FaqItem = {
  question: string
  answer: string
}

type FaqProps = {
  id?: string
  title?: string
  description?: string
  items: FaqItem[]
}

// 자주 묻는 질문 (아코디언)
export function Faq({
  id,
  title = "자주 묻는 질문",
  description,
  items,
}: FaqProps) {
  return (
    <Section id={id} className="border-t" containerClassName="max-w-3xl">
      <SectionHeading title={title} description={description} />
      <Accordion>
        {items.map((item) => (
          <AccordionItem key={item.question} value={item.question}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  )
}
