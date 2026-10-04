import type { Control, FieldPath, FieldValues } from "react-hook-form"

// 모든 폼 필드 컴포넌트가 공유하는 기본 props
export type BaseFormFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = {
  control: Control<TFieldValues>
  name: TName
  label: string
  description?: string
  disabled?: boolean
}
