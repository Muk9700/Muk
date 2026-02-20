-- ============================================
-- Lemon Squeezy 크레딧 결제 관련 테이블 수정
-- ============================================

-- 1. user_generations 테이블에 credits 컬럼 추가
-- 사용자는 무료 생성 외에 결제한 크레딧을 보유할 수 있습니다.
ALTER TABLE public.user_generations 
ADD COLUMN IF NOT EXISTS credits INTEGER NOT NULL DEFAULT 0;

-- 2. 결제 내역(Order) 기록을 위한 테이블 생성
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    lemon_squeezy_id VARCHAR(255) UNIQUE NOT NULL, -- Lemon Squeezy의 order ID
    variant_id VARCHAR(255) NOT NULL,              -- 구매한 상품 ID
    credits_added INTEGER NOT NULL,                -- 충전된 크레딧
    amount INTEGER NOT NULL,                       -- 결제 금액(원)
    status VARCHAR(50) NOT NULL DEFAULT 'paid',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);

-- RLS 정책 설정 (사용자는 본인의 결제 내역만 볼 수 있음)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own orders"
    ON public.orders
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Service role full access orders"
    ON public.orders
    FOR ALL
    USING (auth.role() = 'service_role');
