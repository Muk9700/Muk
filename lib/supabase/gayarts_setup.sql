-- ============================================
-- GayArts Table & Storage Setup
-- ============================================
-- 이 스크립트를 Supabase SQL Editor에 복사해서 실행하세요
-- https://supabase.com/dashboard/project/vgvrzololxxbycfnagrx/editor

-- 1. GayArts 테이블 생성 (AI로 생성된 이미지 저장)
CREATE TABLE IF NOT EXISTS public.gayarts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- 원본 이미지 정보
  original_image_url TEXT,
  original_image_path TEXT,
  
  -- 생성된 이미지 정보
  generated_image_url TEXT NOT NULL,
  generated_image_path TEXT NOT NULL,
  
  -- 메타데이터
  prompt TEXT,
  model_version TEXT,
  generation_time_ms INTEGER,
  
  -- 상태 관리
  status TEXT DEFAULT 'completed' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  error_message TEXT,
  
  -- 타임스탬프
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 인덱스 생성 (성능 최적화)
CREATE INDEX IF NOT EXISTS idx_gayarts_user_id ON public.gayarts(user_id);
CREATE INDEX IF NOT EXISTS idx_gayarts_created_at ON public.gayarts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_gayarts_status ON public.gayarts(status);

-- 3. Row Level Security 활성화
ALTER TABLE public.gayarts ENABLE ROW LEVEL SECURITY;

-- 4. 보안 정책 생성
-- 사용자는 자신의 생성물만 읽을 수 있음
CREATE POLICY "Users can read own gayarts"
  ON public.gayarts
  FOR SELECT
  USING (auth.uid() = user_id);

-- 사용자는 자신의 생성물만 생성할 수 있음
CREATE POLICY "Users can insert own gayarts"
  ON public.gayarts
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 사용자는 자신의 생성물만 수정할 수 있음
CREATE POLICY "Users can update own gayarts"
  ON public.gayarts
  FOR UPDATE
  USING (auth.uid() = user_id);

-- 사용자는 자신의 생성물만 삭제할 수 있음
CREATE POLICY "Users can delete own gayarts"
  ON public.gayarts
  FOR DELETE
  USING (auth.uid() = user_id);

-- 5. updated_at 자동 업데이트 트리거
DROP TRIGGER IF EXISTS on_gayarts_updated ON public.gayarts;
CREATE TRIGGER on_gayarts_updated
  BEFORE UPDATE ON public.gayarts
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- ============================================
-- Storage Bucket 설정
-- ============================================
-- 참고: Storage Bucket은 SQL로 생성할 수 없으므로,
-- Supabase Dashboard에서 수동으로 생성해야 합니다.
-- 
-- 1. https://supabase.com/dashboard/project/vgvrzololxxbycfnagrx/storage/buckets 접속
-- 2. "New bucket" 클릭
-- 3. Bucket 이름: "gayart-images"
-- 4. Public bucket: 체크 (이미지를 공개적으로 접근 가능하게)
-- 5. "Create bucket" 클릭
--
-- Storage 정책은 아래 SQL을 별도로 실행하세요:

-- Storage 정책 (Bucket 생성 후 실행)
-- 모든 인증된 사용자가 자신의 폴더에 업로드 가능
-- CREATE POLICY "Users can upload own images"
--   ON storage.objects FOR INSERT
--   WITH CHECK (
--     bucket_id = 'gayart-images' AND
--     auth.uid()::text = (storage.foldername(name))[1]
--   );

-- 모든 사용자가 이미지를 읽을 수 있음 (Public)
-- CREATE POLICY "Anyone can view images"
--   ON storage.objects FOR SELECT
--   USING (bucket_id = 'gayart-images');

-- 사용자는 자신의 이미지만 삭제 가능
-- CREATE POLICY "Users can delete own images"
--   ON storage.objects FOR DELETE
--   USING (
--     bucket_id = 'gayart-images' AND
--     auth.uid()::text = (storage.foldername(name))[1]
--   );

-- ============================================
-- 완료! 
-- ============================================
-- 다음 단계:
-- 1. 이 SQL을 Supabase SQL Editor에서 실행
-- 2. Storage Bucket "gayart-images" 수동 생성
-- 3. Storage 정책 SQL 실행 (위의 주석 처리된 부분)
