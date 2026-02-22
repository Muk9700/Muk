-- ============================================
-- Polar 결제 관련 테이블 생성
-- ============================================

-- 1. Polar 결제 내역(Order) 기록을 위한 테이블 생성
CREATE TABLE IF NOT EXISTS public.polar_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    polar_order_id VARCHAR(255) UNIQUE NOT NULL, -- Polar의 order ID
    checkout_id VARCHAR(255),                    -- Polar의 checkout ID (선택사항)
    product_id VARCHAR(255) NOT NULL,            -- 구매한 상품 ID
    credits_added INTEGER NOT NULL,               -- 충전된 크레딧
    amount INTEGER NOT NULL,                      -- 결제 금액 (cents 단위 권장)
    currency VARCHAR(10) NOT NULL DEFAULT 'USD', -- 통화 (북미 출시를 위해 USD로 변경)
    status VARCHAR(50) NOT NULL DEFAULT 'paid',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스
CREATE INDEX IF NOT EXISTS idx_polar_orders_user_id ON public.polar_orders(user_id);

-- RLS 정책 설정 (사용자는 본인의 결제 내역만 볼 수 있음)
ALTER TABLE public.polar_orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own polar orders"
    ON public.polar_orders
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Service role full access polar orders"
    ON public.polar_orders
    FOR ALL
    USING (auth.role() = 'service_role');
