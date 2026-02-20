'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function BlueHourHero() {
    const [mounted, setMounted] = useState(false);
    const { user } = useAuth();
    useEffect(() => setMounted(true), []);

    const themes = [
        { id: 'historical', title: '사극 로맨스', subtitle: '달빛 아래 피어난 연정', color: 'from-blue-900/40 to-indigo-900/40' },
        { id: 'office', title: '오피스 로맨스', subtitle: '빌딩 숲 사이의 비밀', color: 'from-slate-800/40 to-blue-900/40' },
        { id: 'fantasy', title: '판타지 로맨스', subtitle: '마법과 검이 교차하는 운명', color: 'from-purple-900/40 to-fuchsia-900/40' },
        { id: 'idol', title: '아이돌 로맨스', subtitle: '무대 뒤의 숨겨진 시선', color: 'from-pink-900/40 to-rose-900/40' },
    ];

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0A0D14]">
            {/* Background Gradients - Blue Hour Vibe */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {/* 메인 배경 (소설 집필하는 20대 초반 미소년 작가) */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-color-dodge transition-opacity duration-1000"
                    style={{ backgroundImage: 'url("/images/hero_author_bg.webp")' }}
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#0A0D14]/95 via-[#10142A]/85 to-[#1D1739]/95" />
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#3b82f6] rounded-full mix-blend-screen filter blur-[100px] opacity-15 animate-blob" />
                <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-[#8b5cf6] rounded-full mix-blend-screen filter blur-[120px] opacity-15 animate-blob animation-delay-2000" />
                <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] bg-[#ec4899] rounded-full mix-blend-screen filter blur-[100px] opacity-10 animate-blob animation-delay-4000" />

                {/* 별무리/입자 모방을 위한 노이즈 텍스처 */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 lg:py-32 flex flex-col items-center text-center">
                <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse shadow-[0_0_8px_rgba(129,140,248,0.8)]"></span>
                    <span className="text-sm font-medium text-indigo-200 tracking-wider">BL 소설 AI 서비스, 블루아워</span>
                </div>

                <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white via-indigo-100 to-purple-200 drop-shadow-sm" style={{ fontFamily: "'Space Grotesk', ui-sans-serif, system-ui" }}>
                    Bl_ueHour
                </h1>

                <p className="text-lg md:text-xl text-indigo-100/70 mb-12 max-w-2xl font-light leading-relaxed">
                    당신이 상상하던 가장 아름다운 서사.<br className="hidden md:block" />
                    장르와 컨셉만 선택하면 한 편의 감성적인 소설로 피어납니다.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4 mb-24 w-full px-4">
                    <Link href={user ? "/dashboard" : "/auth"} className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold text-lg shadow-[0_0_40px_rgba(99,102,241,0.3)] hover:shadow-[0_0_60px_rgba(99,102,241,0.5)] transition-all transform hover:-translate-y-1 active:scale-95 text-center">
                        내 상상력 펼치기
                    </Link>
                    <a href="#how-it-works" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-lg transition-all backdrop-blur-md transform hover:-translate-y-1 active:scale-95 text-center">
                        이용 방법
                    </a>
                </div>

                <div className="w-full text-left mb-6 px-2 flex justify-between items-end">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-1">인기 테마 미리보기</h2>
                        <p className="text-indigo-200/60 text-sm">Bl_ueHour 감성이 담긴 고퀄리티 웹툰 스타일 일러스트</p>
                    </div>
                </div>

                {/* Theme Cards Grid */}
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {themes.map((theme, idx) => (
                        <div key={theme.id} className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 shadow-xl hover:shadow-indigo-500/20 bg-[#141A2E] border border-white/5">
                            {/* Theme Cover Image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                                style={{ backgroundImage: `url("/images/theme_${theme.id}.webp")` }}
                            />

                            {/* Overlay Gradient for readability */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${theme.color} opacity-40 group-hover:opacity-20 transition-opacity duration-500`} />

                            {/* Inner Shimmer Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer" />

                            <div className="absolute inset-0 p-6 flex flex-col justify-end z-30 bg-gradient-to-t from-[#0A0D14] via-[#0A0D14]/80 to-transparent">
                                <h3 className="text-2xl font-bold text-white mb-2 tracking-wide transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">{theme.title}</h3>
                                <p className="text-sm text-indigo-200/80 font-light opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">{theme.subtitle}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx global>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob {
                    animation: blob 10s infinite alternate;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
                @keyframes shimmer {
                    100% { transform: translateX(100%); }
                }
                .animate-shimmer {
                    animation: shimmer 1.5s infinite;
                }
            `}</style>
        </section>
    );
}

export { BlueHourHero as AetherHero };
