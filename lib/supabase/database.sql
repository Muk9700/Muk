-- ============================================
-- Supabase Users Table Setup
-- ============================================
-- 이 스크립트를 Supabase SQL Editor에 복사해서 실행하세요
-- https://supabase.com/dashboard/project/vgvrzololxxbycfnagrx/editor

-- 1. Users 테이블 생성
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Row Level Security 활성화
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- 3. 보안 정책 생성
-- 사용자는 자신의 데이터만 읽을 수 있음
CREATE POLICY "Users can read own data"
  ON public.users
  FOR SELECT
  USING (auth.uid() = id);

-- 사용자는 자신의 데이터만 수정할 수 있음
CREATE POLICY "Users can update own data"
  ON public.users
  FOR UPDATE
  USING (auth.uid() = id);

-- 4. 새 사용자 자동 생성 함수
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. 자동 트리거 생성 (Google 로그인 시 자동으로 users 테이블에 저장)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- 6. updated_at 자동 업데이트 함수
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 7. updated_at 자동 업데이트 트리거
DROP TRIGGER IF EXISTS on_user_updated ON public.users;
CREATE TRIGGER on_user_updated
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- ============================================
-- 완료! 이제 Google 로그인하면 자동으로 users 테이블에 저장됩니다
-- ============================================
