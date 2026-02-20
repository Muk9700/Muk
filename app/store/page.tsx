"use client";

import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { LEMON_SQUEEZY_PRODUCTS, ProductType } from "@/lib/lemonsqueezy/config";
import { cn } from "@/lib/utils";

const StorePage = () => {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState<ProductType | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Redirect to auth if not logged in
    React.useEffect(() => {
        if (!loading && !user) {
            router.push('/auth');
        }
    }, [user, loading, router]);

    const handleCheckout = async (productKey: ProductType) => {
        if (!user) return;
        setIsProcessing(productKey);
        setError(null);

        try {
            const product = LEMON_SQUEEZY_PRODUCTS[productKey];
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    productId: product.id,
                    userId: user.id
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Checkout initialization failed');
            }

            if (data.checkoutUrl) {
                // Redirect to Lemon Squeezy checkout
                window.location.href = data.checkoutUrl;
            } else {
                throw new Error('No checkout URL received');
            }
        } catch (err: any) {
            console.error('Checkout error:', err);
            setError(err.message || '결제 진행 중 오류가 발생했습니다. 다시 시도해 주세요.');
        } finally {
            setIsProcessing(null);
        }
    };

    if (loading || !user) {
        return (
            <div className="min-h-screen bg-[#1c1c1c] text-white flex items-center justify-center">
                <div className="animate-pulse space-y-4 text-center">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-full mx-auto animate-bounce" />
                    <p className="text-white/50 font-medium tracking-wider">로딩 중...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#1c1c1c] text-white selection:bg-purple-500/30 font-sans pb-24">
            {/* Header Area */}
            <header className="fixed top-0 w-full z-50 bg-[#1c1c1c]/80 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center gap-6">
                    <button
                        onClick={() => router.push('/')}
                        className="p-2 -ml-2 rounded-full hover:bg-white/5 transition-colors text-white/50 hover:text-white"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                    </button>
                    <h1 className="text-xl font-bold tracking-tight">크레딧 상점</h1>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-6 pt-32">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent inline-block pb-2">
                        창작의 즐거움을 이어가세요
                    </h2>
                    <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
                        계정당 1회 주어지는 무료 생성 기회를 모두 사용하셨나요?<br />
                        크레딧을 충전하고 나만의 BL 단편 소설을 계속 써 내려가세요.
                    </p>
                </div>

                {error && (
                    <div className="mb-8 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-center text-sm font-medium backdrop-blur-sm">
                        {error}
                    </div>
                )}

                <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                    {/* Taster Pack */}
                    <div className="relative group perspective">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100" />
                        <div className="relative flex flex-col h-full bg-[#2a2a2a] border border-white/10 rounded-3xl p-8 hover:border-purple-500/50 transition-all duration-300 transform group-hover:-translate-y-2">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-1">
                                        {LEMON_SQUEEZY_PRODUCTS.TASTER.name}
                                    </h3>
                                    <p className="text-white/50 text-sm">가볍게 즐기고 싶을 때</p>
                                </div>
                                <div className="p-3 bg-white/5 rounded-2xl text-purple-400">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m11 17 2 2a1 1 0 1 0 3-3" /><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 2.83-2.83Z" /><path d="m6 13 3 3a1 1 0 1 1-3 3" /></svg>
                                </div>
                            </div>

                            <div className="mb-8">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-5xl font-black text-white">
                                        {LEMON_SQUEEZY_PRODUCTS.TASTER.credits}
                                    </span>
                                    <span className="text-xl text-white/50 font-medium">크레딧</span>
                                </div>
                                <div className="mt-2 text-lg text-white/70 font-medium">
                                    ₩{LEMON_SQUEEZY_PRODUCTS.TASTER.priceKRW.toLocaleString()}
                                </div>
                                <div className="mt-1 text-sm text-purple-400/80 font-medium">
                                    (1회당 330원)
                                </div>
                            </div>

                            <button
                                onClick={() => handleCheckout('TASTER')}
                                disabled={isProcessing !== null}
                                className={cn(
                                    "mt-auto w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all",
                                    "bg-white/10 hover:bg-white/15 text-white shadow-sm border border-white/5 hover:border-white/10",
                                    isProcessing === 'TASTER' ? "opacity-50 cursor-not-allowed" : "active:scale-[0.98]"
                                )}
                            >
                                {isProcessing === 'TASTER' ? '결제 준비 중...' : '구매하기'}
                            </button>
                        </div>
                    </div>

                    {/* Bestseller Pack */}
                    <div className="relative group perspective">
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/30 to-orange-500/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all opacity-70 group-hover:opacity-100" />
                        <div className="relative flex flex-col h-full bg-[#2a2a2a] border border-pink-500/30 rounded-3xl p-8 hover:border-pink-500/60 transition-all duration-300 transform group-hover:-translate-y-2">
                            {/* Bestseller Badge */}
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-500 to-orange-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap">
                                가장 인기있는 패키지
                            </div>

                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-1">
                                        {LEMON_SQUEEZY_PRODUCTS.BESTSELLER.name}
                                    </h3>
                                    <p className="text-white/50 text-sm">본격적으로 장편을 기획할 때</p>
                                </div>
                                <div className="p-3 bg-pink-500/10 rounded-2xl text-pink-400">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /><path d="m8 9 2.5 2.5L14 8" /></svg>
                                </div>
                            </div>

                            <div className="mb-8">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-5xl font-black text-white">
                                        {LEMON_SQUEEZY_PRODUCTS.BESTSELLER.credits}
                                    </span>
                                    <span className="text-xl text-white/50 font-medium">크레딧</span>
                                </div>
                                <div className="mt-2 text-lg text-white/70 font-medium">
                                    ₩{LEMON_SQUEEZY_PRODUCTS.BESTSELLER.priceKRW.toLocaleString()}
                                </div>
                                <div className="mt-1 text-sm text-pink-400/80 font-medium">
                                    (1회당 약 282원)
                                </div>
                            </div>

                            <button
                                onClick={() => handleCheckout('BESTSELLER')}
                                disabled={isProcessing !== null}
                                className={cn(
                                    "mt-auto w-full py-4 px-6 rounded-2xl font-bold text-lg shadow-xl transition-all",
                                    "bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-400 hover:to-orange-400 text-white",
                                    isProcessing === 'BESTSELLER' ? "opacity-50 cursor-not-allowed filter grayscale" : "hover:shadow-pink-500/25 hover:scale-[1.02] active:scale-[0.98]"
                                )}
                            >
                                {isProcessing === 'BESTSELLER' ? '결제 준비 중...' : '구매하기'}
                            </button>
                        </div>
                    </div>
                </div>

                <p className="text-center mt-12 text-sm text-white/40 font-medium">
                    결제는 안전한 Lemon Squeezy를 통해 진행됩니다.<br />
                    구매하신 크레딧은 환불이 어려우니 신중하게 선택해 주세요.
                </p>
            </main>
        </div>
    );
};

export default StorePage;
