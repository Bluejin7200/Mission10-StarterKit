# StarterKit

Next.js 16 기반의 모던 웹 스타터킷입니다. 마케팅 페이지, 인증 화면, 대시보드, 데이터 목록, 설정 화면까지 **실제 서비스와 같은 흐름**이 갖춰져 있어 설정을 건너뛰고 바로 기능 개발을 시작할 수 있습니다.

> 외부 백엔드 없이 동작합니다. 인증과 데이터는 Next.js Route Handler + 목업 데이터로 구현되어 있으며, 실제 백엔드로 교체할 지점이 한 곳에 모여 있습니다. ([백엔드 교체하기](#실제-백엔드로-교체하기) 참고)

## 목차

- [기술 스택](#기술-스택)
- [시작하기](#시작하기)
- [라우트](#라우트)
- [폴더 구조](#폴더-구조)
- [주요 기능](#주요-기능)
- [개발 가이드](#개발-가이드)
- [실제 백엔드로 교체하기](#실제-백엔드로-교체하기)
- [테스트](#테스트)
- [보안 점검 (npm audit)](#보안-점검-npm-audit)

## 기술 스택

| 구분 | 사용 기술 |
| --- | --- |
| 프레임워크 | Next.js 16 (App Router, Turbopack), React 19 |
| 언어 | TypeScript |
| 스타일 | Tailwind CSS v4, tw-animate-css |
| UI 컴포넌트 | shadcn/ui (Base UI 기반), lucide-react 아이콘 |
| 애니메이션 | motion (구 Framer Motion) |
| 폼·검증 | React Hook Form, Zod 4, @hookform/resolvers |
| 상태 관리 | Zustand (클라이언트), TanStack Query (서버 상태), nuqs (URL 상태) |
| 유틸리티 | date-fns, es-toolkit, usehooks-ts, cmdk |
| 테마·알림 | next-themes, sonner |
| 테스트 | Vitest |

## 시작하기

```bash
npm install
cp .env.example .env.local   # 환경변수 설정 (선택)
npm run dev                  # http://localhost:3000
```

| 스크립트 | 설명 |
| --- | --- |
| `npm run dev` | 개발 서버 실행 |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 빌드 결과 실행 |
| `npm run lint` | ESLint 검사 |
| `npm test` | 단위 테스트 1회 실행 |
| `npm run test:watch` | 단위 테스트 감시 모드 |

### 환경변수

| 이름 | 설명 | 기본값 |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | 사이트 공개 주소 (메타데이터 기준 URL) | `http://localhost:3000` |

환경변수는 `src/lib/env.ts`의 Zod 스키마로 검증됩니다. 새 변수를 추가할 때는 `.env.example`과 스키마를 함께 수정하세요.

### 데모 계정

로그인은 데모용이라 **형식만 맞으면 어떤 이메일·비밀번호로도** 로그인됩니다. (예: `demo@example.com` / 아무 비밀번호)

## 라우트

| 경로 | 설명 | 접근 |
| --- | --- | --- |
| `/` | 랜딩 페이지 (Hero, 통계, 기능, FAQ, CTA) | 누구나 |
| `/login` | 로그인 | 비로그인 사용자 |
| `/signup` | 회원가입 | 비로그인 사용자 |
| `/dashboard` | 대시보드 홈 (통계 카드, 최근 주문) | 로그인 필요 |
| `/dashboard/orders` | 주문 목록 (검색·필터·페이지네이션) | 로그인 필요 |
| `/dashboard/settings` | 환경설정 | 로그인 필요 |
| `/api/auth/login` · `signup` · `logout` | 인증 API (POST) | — |
| `/api/orders` | 주문 목록 API (GET) | 로그인 필요 |

- 로그인하지 않고 `/dashboard`에 접근하면 `src/proxy.ts`가 `/login?next=원래경로`로 보내고, 로그인 후 원래 페이지로 돌아옵니다.
- 로그인 상태에서 `/login`, `/signup`에 접근하면 `/dashboard`로 이동합니다.

## 폴더 구조

```
src/
├─ app/
│  ├─ (marketing)/          # 헤더·푸터가 있는 마케팅 영역 (홈)
│  ├─ (auth)/               # 화면 중앙 카드 레이아웃 (로그인, 회원가입)
│  ├─ dashboard/            # 사이드바 레이아웃 (대시보드, 주문, 설정)
│  │  ├─ loading.tsx        # 페이지 전환 스켈레톤
│  │  └─ error.tsx          # 대시보드 오류 경계
│  ├─ api/                  # Route Handler (auth, orders)
│  ├─ layout.tsx            # 루트 레이아웃 (Providers, Toaster)
│  ├─ error.tsx · global-error.tsx · not-found.tsx
│  └─ globals.css           # Tailwind 및 테마 토큰
├─ components/
│  ├─ ui/                   # shadcn/ui 컴포넌트 (40여 개)
│  ├─ common/               # 범용 컴포넌트 (확인창, 빈 상태, 오류 화면, 페이지네이션 등)
│  ├─ form/                 # React Hook Form 연동 필드 (input, textarea, select, checkbox, switch)
│  ├─ layout/               # 헤더, 푸터, 사이드바, 대시보드 헤더, 커맨드 팔레트 등
│  ├─ sections/             # 마케팅 섹션 (hero, stats, feature-grid, faq, cta)
│  ├─ motion/               # 애니메이션 (FadeIn, Stagger, AnimatedNumber)
│  ├─ auth/ · orders/ · settings/   # 기능별 컴포넌트
│  └─ providers.tsx         # 테마 → Query → nuqs → Motion → Tooltip
├─ config/site.ts           # 사이트 이름, 설명, 상단 메뉴, 대시보드 메뉴
├─ hooks/                   # 커스텀 훅 (모바일 감지, 스토어 복원, 주문 URL 조건)
├─ lib/
│  ├─ api/                  # API 호출 함수 (클라이언트) + Route Handler 공통 헬퍼
│  ├─ auth/                 # 세션 쿠키 처리
│  ├─ mock/                 # 목업 데이터와 조회 로직
│  ├─ validations/          # Zod 스키마 (auth, settings, common)
│  ├─ orders.ts             # 주문 도메인 타입·상수·조회 조건 스키마
│  ├─ env.ts · format.ts · pagination.ts · query-client.ts · utils.ts
├─ stores/                  # Zustand 스토어 (환경설정, localStorage 저장)
└─ proxy.ts                 # 인증이 필요한 경로 보호 (Next 16의 middleware 대체)
```

## 주요 기능

- **인증 흐름**: 로그인·회원가입·로그아웃, httpOnly 세션 쿠키, 경로 보호, 로그인 후 원래 페이지 복귀, 오픈 리다이렉트 방지
- **데이터 목록**: TanStack Query로 조회, 검색어(디바운스)·상태 필터·페이지를 URL에 동기화 → 새로고침·링크 공유 시 조건 유지, 로딩 스켈레톤·빈 상태·에러 재시도
- **폼**: Zod 스키마 + React Hook Form 필드 컴포넌트, 한국어 오류 메시지
- **환경설정**: Zustand persist로 localStorage 저장, 설정한 표시 이름을 사이드바에 반영
- **커맨드 팔레트**: 대시보드에서 `⌘K` / `Ctrl+K`로 페이지 이동·테마 전환
- **애니메이션**: 스크롤 진입 페이드, 카드 순차 등장, 숫자 카운트업. OS의 "동작 줄이기" 설정을 존중
- **반응형**: 모바일 메뉴(Sheet), 모바일에서 자동으로 Sheet로 바뀌는 사이드바, 반응형 그리드
- **다크 모드**: 라이트/다크/시스템 테마
- **오류 처리**: 전역·대시보드 오류 경계, 404 페이지

## 개발 가이드

### 사이트 정보·메뉴 변경

`src/config/site.ts`의 `mainNav`(상단 메뉴), `dashboardNav`(사이드바·커맨드 팔레트·breadcrumb)를 수정하면 모든 곳에 반영됩니다.

### 페이지 추가

```tsx
// src/app/dashboard/reports/page.tsx
import type { Metadata } from "next"

import { PageHeader } from "@/components/common/page-header"

export const metadata: Metadata = { title: "리포트" }

export default function ReportsPage() {
  return <PageHeader title="리포트" description="월간 리포트를 확인합니다." />
}
```

그다음 `siteConfig.dashboardNav`에 메뉴를 추가합니다. `dashboard/` 아래 페이지는 자동으로 로그인이 필요해집니다.

### 폼 추가

1. `src/lib/validations/`에 Zod 스키마를 만들고 타입을 `z.infer`로 내보냅니다.
2. `useForm({ resolver: zodResolver(schema) })`와 `components/form/*` 필드를 조합합니다.
3. 서버로 보낼 때는 `useMutation` + `src/lib/api/*`의 호출 함수를 사용합니다. (예: `components/auth/login-form.tsx`)

### API 추가

1. `src/app/api/<이름>/route.ts`에 Route Handler를 작성합니다. 요청 본문은 `parseBody(request, schema)`, 오류 응답은 `apiError(message, status)`를 사용합니다. (`src/lib/api/response.ts`)
2. 클라이언트 호출 함수는 `src/lib/api/<이름>.ts`에 `apiFetch` / `apiPost`로 작성하고, 조회는 `queryOptions`로 묶습니다. (예: `src/lib/api/orders.ts`)

### 전역 상태 추가

`src/stores/preferences-store.ts`를 참고하세요. localStorage에 저장하는 스토어는 하이드레이션 불일치를 막기 위해 `skipHydration: true`로 만들고, `Providers`에서 복원합니다.

### 애니메이션 적용

```tsx
import { FadeIn } from "@/components/motion/fade-in"
import { Stagger, StaggerItem } from "@/components/motion/stagger"

<FadeIn delay={0.1}>뷰포트에 들어오면 페이드 인</FadeIn>

<Stagger className="grid gap-4 sm:grid-cols-3">
  {items.map((item) => <StaggerItem key={item.id}>…</StaggerItem>)}
</Stagger>
```

첫 화면 요소에는 `immediate`를 주면 마운트 즉시 재생됩니다. 서버 컴포넌트 안에서도 그대로 감싸 쓸 수 있습니다.

### UI 컴포넌트 사용 시 참고

- 컴포넌트 추가: `npx shadcn@latest add <이름>`
- 이 프로젝트의 shadcn/ui는 **Base UI 기반**이라 `asChild` 대신 `render` 속성을 사용합니다.
  ```tsx
  <SheetTrigger render={<Button variant="ghost" />}>열기</SheetTrigger>
  ```
- 링크를 버튼 모양으로: `<Link className={buttonVariants({ variant: "outline" })}>`
- `buttonVariants()`에 `className`을 넘기면 클래스가 **병합되지 않고 이어 붙기만** 합니다. `hidden`처럼 기본 스타일과 충돌하는 클래스는 `cn(buttonVariants(), "hidden md:inline-flex")`로 합치세요.

## 실제 백엔드로 교체하기

데이터 접근이 아래 파일에 모여 있어, 화면 코드는 거의 수정하지 않고 교체할 수 있습니다.

| 교체 대상 | 현재 구현 | 바꿀 내용 |
| --- | --- | --- |
| `src/lib/auth/session.ts` | 서명 없는 base64 JSON 쿠키 | **반드시 교체.** 서명·암호화된 토큰(JWT, iron-session) 또는 인증 서비스(Auth.js, Supabase 등)의 세션 |
| `src/app/api/auth/*` | 형식만 맞으면 로그인 성공 | 실제 사용자 조회·비밀번호 검증·사용자 생성 |
| `src/lib/mock/orders.ts` | 시드 고정 목업 50건 | DB 조회 (조회 조건 타입 `OrdersQuery`는 그대로 사용 가능) |
| `src/lib/api/*` | 내부 Route Handler 호출 | 외부 API를 직접 호출하려면 이 파일들만 수정 |
| `src/app/dashboard/page.tsx` | 통계 카드 하드코딩 | 실제 집계 데이터 |

> ⚠️ 현재 세션 쿠키는 서명이 없어 **사용자가 임의로 만들 수 있습니다.** 데모·학습용으로만 사용하고, 실제 서비스 전에는 반드시 교체하세요.

## 테스트

```bash
npm test             # 1회 실행
npm run test:watch   # 변경 감시
```

테스트 파일은 대상 파일 옆에 `*.test.ts`로 둡니다. 현재 검증 스키마, 포맷 유틸, 주문 조회 로직, 페이지 번호 계산, 세션 처리에 대한 단위 테스트가 있습니다. 날짜 테스트가 실행 환경에 영향받지 않도록 `vitest.config.mts`에서 시간대를 `Asia/Seoul`로 고정합니다.

## 보안 점검 (npm audit)

```bash
npm audit --omit=dev   # 운영(배포) 의존성만 점검 → 0건이 정상
```

- 전체 `npm audit`를 실행하면 **high 등급 경고 여러 건**이 보이지만, 모두 `braces` 패키지의 DoS 취약점([GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm)) 하나에서 연쇄로 보고되는 것입니다.
- 이 경고는 `shadcn` CLI와 `eslint-config-next` 같은 **개발 도구에만** 해당합니다. 브라우저 번들이나 서버 런타임에는 포함되지 않습니다.
- 아직 패치된 `braces` 버전이 없습니다. 패치가 나오면 `npm update`로 해결됩니다.
- ⚠️ **`npm audit fix --force`는 실행하지 마세요.** shadcn을 1.0.0으로, eslint-config-next를 14 버전으로 다운그레이드해서 프로젝트가 깨집니다.
