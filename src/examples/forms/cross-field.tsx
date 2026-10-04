"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { FormInput } from "@/components/form/form-input"
import { Button } from "@/components/ui/button"
import { FieldGroup } from "@/components/ui/field"

// 여러 필드를 비교하는 규칙은 object 전체에 refine으로 작성하고, path로 오류 표시 위치 지정
const amount = (label: string) =>
  z.string().min(1, `${label}을 입력해주세요.`).regex(/^\d+$/, "숫자만 입력해주세요.")

const periodSchema = z
  .object({
    startDate: z.string().min(1, "시작일을 선택해주세요."),
    endDate: z.string().min(1, "종료일을 선택해주세요."),
    minPrice: amount("최소 금액"),
    maxPrice: amount("최대 금액"),
  })
  .refine((v) => v.endDate >= v.startDate, {
    message: "종료일은 시작일 이후여야 합니다.",
    path: ["endDate"],
  })
  .refine((v) => Number(v.maxPrice) >= Number(v.minPrice), {
    message: "최대 금액은 최소 금액보다 커야 합니다.",
    path: ["maxPrice"],
  })

type PeriodValues = z.infer<typeof periodSchema>

export default function CrossFieldExample() {
  const form = useForm<PeriodValues>({
    resolver: zodResolver(periodSchema),
    defaultValues: { startDate: "", endDate: "", minPrice: "", maxPrice: "" },
    // 값을 고칠 때마다 다시 검증해 오류가 바로 사라지도록
    mode: "onTouched",
  })

  const onSubmit = (values: PeriodValues) => {
    const won = (value: string) => Number(value).toLocaleString()
    toast.success(
      `${values.startDate} ~ ${values.endDate}, ${won(values.minPrice)}~${won(values.maxPrice)}원으로 검색합니다.`
    )
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="max-w-md">
      <FieldGroup>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormInput control={form.control} name="startDate" label="시작일" type="date" />
          <FormInput control={form.control} name="endDate" label="종료일" type="date" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormInput control={form.control} name="minPrice" label="최소 금액" inputMode="numeric" />
          <FormInput control={form.control} name="maxPrice" label="최대 금액" inputMode="numeric" />
        </div>
        <Button type="submit">검색</Button>
      </FieldGroup>
    </form>
  )
}
