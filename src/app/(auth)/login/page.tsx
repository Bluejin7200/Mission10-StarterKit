import type { Metadata } from "next"
import Link from "next/link"

import { LoginForm } from "@/components/auth/login-form"
import { AuthCard } from "@/components/layout/auth-card"

export const metadata: Metadata = {
  title: "로그인",
}

export default function LoginPage() {
  return (
    <AuthCard
      title="로그인"
      description="이메일과 비밀번호를 입력해주세요."
      footer={
        <Link href="/" className="underline-offset-4 hover:text-foreground hover:underline">
          홈으로 돌아가기
        </Link>
      }
    >
      <LoginForm />
    </AuthCard>
  )
}
