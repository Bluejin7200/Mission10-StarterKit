// 사이트 전역 설정: 이름, 설명, 내비게이션 등을 한 곳에서 관리
export type NavItem = {
  title: string
  href: string
}

export const siteConfig = {
  name: "StarterKit",
  description:
    "Next.js, TypeScript, Tailwind CSS, shadcn/ui 기반의 모던 웹 스타터킷",
  url: "http://localhost:3000",
  mainNav: [
    { title: "홈", href: "/" },
    { title: "기능", href: "/#features" },
    { title: "시작하기", href: "/#get-started" },
  ] satisfies NavItem[],
  links: {
    github: "https://github.com",
  },
}
