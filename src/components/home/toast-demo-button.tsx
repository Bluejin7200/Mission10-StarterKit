"use client"

import { BellRing } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"

// 토스트 알림 동작을 확인하는 데모 버튼
export function ToastDemoButton() {
  return (
    <Button
      variant="outline"
      size="lg"
      onClick={() => toast.success("스타터킷이 정상적으로 동작합니다!")}
    >
      <BellRing /> 토스트 테스트
    </Button>
  )
}
