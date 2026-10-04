import { z } from "zod"

import { emailSchema } from "@/lib/validations/common"

export const loginSchema = z.object({
  email: emailSchema,
  // 로그인 시에는 형식 규칙 없이 입력 여부만 확인
  password: z.string().min(1, "비밀번호를 입력해주세요."),
  remember: z.boolean(),
})

export type LoginValues = z.infer<typeof loginSchema>
