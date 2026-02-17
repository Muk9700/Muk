# 🎨 GayArt AI - AI 기반 사진 변환 서비스

AI를 활용하여 사진을 매력적으로 변환하는 웹 애플리케이션입니다.

## ✨ 주요 기능

- 🔐 **Google OAuth 로그인** - 간편한 소셜 로그인
- 📸 **이미지 업로드** - 드래그 앤 드롭으로 쉽게 업로드
- 🤖 **AI 이미지 변환** - 고급 AI 모델로 사진 변환
- 🖼️ **갤러리** - 생성된 이미지 관리 및 공유
- 📊 **대시보드** - 사용자별 통계 및 히스토리

## 🚀 시작하기

### 필수 요구사항

- Node.js 18+ 
- npm 또는 yarn
- Supabase 계정

### 설치

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

## 🗄️ 데이터베이스 설정

### 1. Users 테이블 설정

`lib/supabase/database.sql` 파일의 내용을 Supabase SQL Editor에서 실행하세요.

자세한 내용은 [DATABASE_SETUP.md](./DATABASE_SETUP.md) 참조

### 2. GayArts 테이블 & 스토리지 설정

`lib/supabase/gayarts_setup.sql` 파일의 내용을 Supabase SQL Editor에서 실행하세요.

자세한 내용은 [GAYARTS_SETUP.md](./GAYARTS_SETUP.md) 참조

## 📁 프로젝트 구조

```
nailart/
├── app/                      # Next.js App Router
│   ├── page.tsx             # 메인 랜딩 페이지
│   ├── auth/                # 인증 페이지
│   ├── dashboard/           # 대시보드 페이지
│   └── layout.tsx           # 루트 레이아웃
├── components/              # React 컴포넌트
│   ├── main/               # 메인 페이지 컴포넌트
│   └── PromptArea.tsx      # 프롬프트 입력 컴포넌트
├── contexts/               # React Context
│   └── AuthContext.tsx     # 인증 상태 관리
├── lib/                    # 유틸리티 & 라이브러리
│   └── supabase/          # Supabase 관련
│       ├── client.ts      # Supabase 클라이언트
│       ├── database.ts    # 데이터베이스 헬퍼
│       ├── gayarts.ts     # GayArts 헬퍼 함수
│       ├── database.sql   # Users 테이블 SQL
│       └── gayarts_setup.sql  # GayArts 테이블 SQL
└── public/                # 정적 파일
```

## 🔧 환경 변수

`.env.local` 파일을 생성하고 다음 변수를 설정하세요:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## 🎯 사용 방법

### 1. 로그인
- 메인 페이지에서 "Login" 버튼 클릭
- Google 계정으로 로그인

### 2. 이미지 업로드
- 대시보드에서 이미지 업로드
- 프롬프트 입력 (선택사항)

### 3. AI 변환
- AI가 이미지를 분석하고 변환
- 결과 확인 및 다운로드

### 4. 갤러리
- 생성된 모든 이미지 확인
- 이미지 공유 및 삭제

## 📚 기술 스택

- **프레임워크**: Next.js 16 (App Router)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS 4
- **인증**: Supabase Auth (Google OAuth)
- **데이터베이스**: Supabase (PostgreSQL)
- **스토리지**: Supabase Storage
- **UI 컴포넌트**: Radix UI

## 🔐 보안

- Row Level Security (RLS) 활성화
- 사용자는 자신의 데이터만 접근 가능
- Google OAuth를 통한 안전한 인증
- 이미지 업로드 시 사용자별 폴더 분리

## 📖 문서

- [데이터베이스 설정](./DATABASE_SETUP.md)
- [GayArts 설정](./GAYARTS_SETUP.md)
- [Supabase 설정](./SUPABASE_SETUP.md)
- [설정 완료 가이드](./SETUP_COMPLETE.md)

## 🤝 기여

이슈와 풀 리퀘스트를 환영합니다!

## 📄 라이선스

MIT License
