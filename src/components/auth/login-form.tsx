"use client"

import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { FormCheckbox } from "@/components/form/form-checkbox"
import { FormInput } from "@/components/form/form-input"
import { Button } from "@/components/ui/button"
import { FieldGroup } from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner"
import { loginSchema, type LoginValues } from "@/lib/validations/auth"

// 로그인 폼 (백엔드 없는 데모: 검증 통과 시 대시보드로 이동)
export function LoginForm() {
  const router = useRouter()
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", remember: false },
  })

  const onSubmit = async (values: LoginValues) => {
    // 실제 인증 API 호출 자리 (데모에서는 지연만 흉내냄)
    await new Promise((resolve) => setTimeout(resolve, 500))
    toast.success(`${values.email} 계정으로 로그인했습니다.`)
    router.push("/dashboard")
  }

  const { isSubmitting } = form.formState

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <FieldGroup>
        <FormInput
          control={form.control}
          name="email"
          label="이메일"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
        />
        <FormInput
          control={form.control}
          name="password"
          label="비밀번호"
          type="password"
          autoComplete="current-password"
        />
        <FormCheckbox control={form.control} name="remember" label="로그인 상태 유지" />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting && <Spinner />}
          로그인
        </Button>
      </FieldGroup>
    </form>
  )
}
