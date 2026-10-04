# StarterKit

Next.js 기반으로 웹 페이지를 빠르게 만들 수 있는 모던 웹 스타터킷입니다.

## 기술 스택

| 구분 | 사용 기술 |
| --- | --- |
| 프레임워크 | Next.js 16 (App Router, Turbopack) |
| 언어 | TypeScript |
| 스타일 | Tailwind CSS v4 |
| UI 컴포넌트 | shadcn/ui (Base UI 기반) |
| 아이콘 | lucide-react |
| 테마 | next-themes (라이트/다크/시스템) |
| 알림 | sonner |

## 시작하기

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # 프로덕션 빌드
npm run lint    # ESLint 검사
```

## 폴더 구조

```
src/
├─ app/
│  ├─ layout.tsx        # 루트 레이아웃 (테마, 헤더/푸터, 토스트)
│  ├─ page.tsx          # 랜딩 페이지 예시
│  ├─ not-found.tsx     # 404 페이지
│  └─ globals.css       # Tailwind 및 테마 토큰
├─ components/
│  ├─ layout/           # Header, Footer, MobileNav, Container
│  ├─ home/             # 랜딩 페이지 전용 컴포넌트
│  ├─ ui/               # shadcn/ui 컴포넌트
│  ├─ theme-provider.tsx
│  └─ theme-toggle.tsx
├─ config/site.ts       # 사이트명, 설명, 내비게이션 설정
└─ lib/utils.ts         # cn() 클래스 병합 유틸
```

## 사용 방법

- **사이트 정보/메뉴 변경**: `src/config/site.ts`만 수정하면 헤더·모바일 메뉴·메타데이터에 반영됩니다.
- **새 페이지 추가**: `src/app/about/page.tsx`처럼 폴더를 만들고 `page.tsx`를 작성합니다.
- **컴포넌트 추가**:
  ```bash
  npx shadcn@latest add dialog tabs form
  ```
- **아이콘 사용**:
  ```tsx
  import { Rocket } from "lucide-react"
  <Rocket className="size-4" />
  ```
- **링크를 버튼처럼**: `<Link className={buttonVariants({ variant: "outline" })}>`
- **컴포넌트 합성**: 이 프로젝트의 shadcn/ui는 Base UI 기반이라 `asChild` 대신 `render` 속성을 사용합니다.
  ```tsx
  <SheetTrigger render={<Button variant="ghost" />}>열기</SheetTrigger>
  ```

## 보안 점검 (npm audit)

```bash
npm audit --omit=dev   # 운영(배포) 의존성만 점검 → 0건이 정상
```

- 전체 `npm audit`를 실행하면 **high 등급 경고 여러 건**이 보이지만, 모두 `braces` 패키지의 DoS 취약점([GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm)) 하나에서 연쇄로 보고되는 것입니다.
- 이 경고는 `shadcn` CLI와 `eslint-config-next` 같은 **개발 도구에만** 해당합니다. 브라우저 번들이나 서버 런타임에는 포함되지 않습니다.
- 아직 패치된 `braces` 버전이 없습니다. 패치가 나오면 `npm update`로 해결됩니다.
- ⚠️ **`npm audit fix --force`는 실행하지 마세요.** shadcn을 1.0.0으로, eslint-config-next를 14 버전으로 다운그레이드해서 프로젝트가 깨집니다.
