import { describe, expect, it } from "vitest"

import { decodeSession, encodeSession, getSafeRedirect } from "@/lib/auth/session"

describe("세션 인코딩", () => {
  it("인코딩한 세션을 그대로 복원한다", () => {
    const session = { name: "테스터", email: "tester@example.com" }
    expect(decodeSession(encodeSession(session))).toEqual(session)
  })

  it.each([
    ["값 없음", undefined],
    ["base64가 아님", "!!!"],
    ["JSON이 아님", Buffer.from("hello").toString("base64url")],
    ["필드 누락", Buffer.from(JSON.stringify({ name: "x" })).toString("base64url")],
    ["이메일 형식 오류", Buffer.from(JSON.stringify({ name: "x", email: "x" })).toString("base64url")],
  ])("잘못된 쿠키(%s)는 null을 반환한다", (_, value) => {
    expect(decodeSession(value)).toBeNull()
  })
})

describe("getSafeRedirect", () => {
  it("내부 경로는 그대로 사용한다", () => {
    expect(getSafeRedirect("/dashboard/orders?page=2")).toBe("/dashboard/orders?page=2")
  })

  it.each([
    ["값 없음", null],
    ["외부 URL", "https://evil.com"],
    ["프로토콜 상대 URL", "//evil.com"],
    ["상대 경로", "dashboard"],
  ])("안전하지 않은 값(%s)은 기본 경로로 바꾼다", (_, next) => {
    expect(getSafeRedirect(next)).toBe("/dashboard")
  })

  it("기본 경로를 지정할 수 있다", () => {
    expect(getSafeRedirect(undefined, "/")).toBe("/")
  })
})
