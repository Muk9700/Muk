-- ============================================
-- User Generations (무료 횟수 제한) 테이블 설정
-- ============================================
-- Supabase SQL Editor에서 실행하세요:
-- https://supabase.com/dashboard/project/vgvrzololxxbycfnagrx/editor

-- 1. 사용자 생성 기록 테이블
CREATE TABLE IF NOT EXISTS public.user_generations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  count INTEGER NOT NULL DEFAULT 0,
  last_ip TEXT, -- 추가: 가장 최근 생성 시 사용된 IP
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- 2. 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_user_generations_user_id ON public.user_generations(user_id);

-- 3. Row Level Security 활성화
ALTER TABLE public.user_generations ENABLE ROW LEVEL SECURITY;

-- 4. 보안 정책
-- 자신의 생성 기록만 읽을 수 있음
CREATE POLICY "Users can read own generation count"
  ON public.user_generations
  FOR SELECT
  USING (auth.uid() = user_id);

-- 자신의 기록만 삽입 가능
CREATE POLICY "Users can insert own generation count"
  ON public.user_generations
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 자신의 기록만 수정 가능
CREATE POLICY "Users can update own generation count"
  ON public.user_generations
  FOR UPDATE
  USING (auth.uid() = user_id);

-- 5. Service role이 모든 레코드에 접근 가능 (서버사이드 API용)
CREATE POLICY "Service role full access"
  ON public.user_generations
  FOR ALL
  USING (auth.role() = 'service_role');

-- 6. updated_at 자동 갱신 트리거 (handle_updated_at 함수가 이미 있는 경우)
DROP TRIGGER IF EXISTS on_user_generations_updated ON public.user_generations;
CREATE TRIGGER on_user_generations_updated
  BEFORE UPDATE ON public.user_generations
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();
