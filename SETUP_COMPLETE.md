# 🚀 Supabase 설정 완료 가이드

## ✅ 완료된 작업

1. ✅ Supabase 클라이언트 설정
2. ✅ Google OAuth 로그인 구현
3. ✅ AuthContext로 전역 로그인 상태 관리
4. ✅ 환경 변수 설정 완료

## 📋 다음 단계: 데이터베이스 설정

### 1. Supabase SQL Editor 열기

1. 이 링크로 이동: https://supabase.com/dashboard/project/vgvrzololxxbycfnagrx/editor
2. 왼쪽 메뉴에서 **"SQL Editor"** 클릭
3. **"New query"** 버튼 클릭

### 2. SQL 스크립트 실행

`lib/supabase/database.sql` 파일의 내용을 복사해서 SQL Editor에 붙여넣고 **"Run"** 버튼을 클릭하세요.

이 스크립트는:
- ✅ `users` 테이블 생성
- ✅ Row Level Security (RLS) 활성화
- ✅ 자동 트리거 설정 (Google 로그인 시 자동으로 users 테이블에 저장)

### 3. Google OAuth 설정

1. Supabase Dashboard: https://supabase.com/dashboard/project/vgvrzololxxbycfnagrx/auth/providers
2. **"Google"** 제공자 활성화
3. Google Cloud Console에서 OAuth 2.0 클라이언트 ID 생성:
   - https://console.cloud.google.com/apis/credentials
   - **Authorized redirect URIs**에 추가:
     ```
     https://vgvrzololxxbycfnagrx.supabase.co/auth/v1/callback
     ```
4. Client ID와 Client Secret을 Supabase에 입력

### 4. Site URL 설정

1. https://supabase.com/dashboard/project/vgvrzololxxbycfnagrx/auth/url-configuration
2. **Site URL**: `http://localhost:3000`
3. **Redirect URLs**: `http://localhost:3000/**`

### 5. 테스트

```bash
npm run dev
```

1. http://localhost:3000 접속
2. 우측 상단 "Login" 클릭
3. "Continue with Google" 클릭
4. Google 계정으로 로그인
5. 메인 페이지로 리다이렉트되면 성공!
6. 우측 상단에 프로필 사진과 이름이 표시됩니다

## 📁 생성된 파일들

- ✅ `contexts/AuthContext.tsx` - 전역 인증 상태 관리
- ✅ `lib/supabase/client.ts` - Supabase 클라이언트
- ✅ `lib/supabase/database.ts` - 데이터베이스 헬퍼 함수
- ✅ `lib/supabase/database.sql` - 데이터베이스 스키마
- ✅ `.env.local` - 환경 변수 (Supabase 자격 증명)

## 🎯 작동 방식

1. 사용자가 Google로 로그인
2. Supabase Auth가 인증 처리
3. 자동 트리거가 `users` 테이블에 사용자 정보 저장
4. AuthContext가 전역 로그인 상태 관리
5. 모든 페이지에서 `useAuth()` 훅으로 사용자 정보 접근 가능

## 🔧 사용 예제

```tsx
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, loading, signOut } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please login</div>;
  
  return (
    <div>
      <p>Welcome, {user.email}!</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
```

## 🐛 문제 해결

### "Missing Supabase environment variables" 에러
- `.env.local` 파일이 제대로 생성되었는지 확인
- 개발 서버 재시작: `npm run dev`

### Google 로그인이 작동하지 않음
- Google OAuth 설정 확인
- Redirect URI가 정확한지 확인
- Site URL 설정 확인

### 사용자가 데이터베이스에 저장되지 않음
- SQL 스크립트가 제대로 실행되었는지 확인
- Supabase Table Editor에서 `users` 테이블 확인
