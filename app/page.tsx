'use client';

import AetherHero from '@/components/main/hero';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  // Redirect to dashboard if user is logged in
  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  return (
    <main style={{ position: 'relative' }}>
      {/* Login/User Profile button - fixed top right */}
      {loading ? (
        <div style={{
          position: 'fixed',
          top: 'min(6vw, 32px)',
          right: 'min(6vw, 32px)',
          zIndex: 100,
          padding: '10px 20px',
          borderRadius: 10,
          background: 'rgba(255, 255, 255, 0.12)',
          backdropFilter: 'blur(10px) saturate(120%)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: '#ffffff',
          fontSize: '0.95rem',
          fontWeight: 600,
          fontFamily: "'Space Grotesk', ui-sans-serif, system-ui, -apple-system",
        }}>
          Loading...
        </div>
      ) : user ? (
        <div style={{
          position: 'fixed',
          top: 'min(6vw, 32px)',
          right: 'min(6vw, 32px)',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '8px 12px',
          borderRadius: 10,
          background: 'rgba(255, 255, 255, 0.12)',
          backdropFilter: 'blur(10px) saturate(120%)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        }}>
          {user.user_metadata?.avatar_url && (
            <img
              src={user.user_metadata.avatar_url}
              alt="Profile"
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                border: '2px solid rgba(255, 255, 255, 0.3)',
              }}
            />
          )}
          <span style={{
            color: '#ffffff',
            fontSize: '0.9rem',
            fontWeight: 600,
            fontFamily: "'Space Grotesk', ui-sans-serif, system-ui, -apple-system",
          }}>
            {user.user_metadata?.full_name || user.email}
          </span>
          <button
            onClick={signOut}
            style={{
              padding: '6px 12px',
              borderRadius: 6,
              background: 'rgba(239, 68, 68, 0.2)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              color: '#fca5a5',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              fontFamily: "'Space Grotesk', ui-sans-serif, system-ui, -apple-system",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(239, 68, 68, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
            }}
          >
            Sign Out
          </button>
        </div>
      ) : (
        <Link
          href="/auth"
          style={{
            position: 'fixed',
            top: 'min(6vw, 32px)',
            right: 'min(6vw, 32px)',
            zIndex: 100,
            padding: '10px 20px',
            borderRadius: 10,
            background: 'rgba(255, 255, 255, 0.12)',
            backdropFilter: 'blur(10px) saturate(120%)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#ffffff',
            textDecoration: 'none',
            fontSize: '0.95rem',
            fontWeight: 600,
            fontFamily: "'Space Grotesk', ui-sans-serif, system-ui, -apple-system",
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            transition: 'all 0.2s ease',
            display: 'inline-block',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.18)';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.25)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
          }}
        >
          Login
        </Link>
      )}

      {/* Font import */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&display=swap');
      `}</style>

      <AetherHero
        title="BL 소설 생성 AI"
        subtitle="장르, 성격, 컨셉만 넣으면 당신만의 특별한 BL 단편 소설을 만들어드립니다. 지금 바로 시작해보세요."
        ctaLabel="소설 쓰러 가기"
        ctaHref="/dashboard"
        secondaryCtaLabel="둘러보기"
        secondaryCtaHref="#how-it-works"
      />

      {/* Feature highlights with custom SVG */}
      <section style={{
        background: 'linear-gradient(180deg, #000000 0%, #0a0a0a 100%)',
        padding: 'min(8vw, 80px) min(6vw, 64px)',
        color: '#ffffff',
      }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
        }}>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            fontWeight: 700,
            textAlign: 'center',
            marginBottom: '3rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            How It Works
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
          }}>
            {/* Step 1: Input */}
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              borderRadius: 16,
              padding: '2rem',
              border: '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
            }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="8" y="12" width="48" height="40" rx="4" stroke="url(#grad1)" strokeWidth="2" fill="rgba(102,126,234,0.1)" />
                  <path d="M32 24L32 36M32 24L28 28M32 24L36 28" stroke="url(#grad1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="32" cy="42" r="2" fill="url(#grad1)" />
                  <defs>
                    <linearGradient id="grad1" x1="8" y1="12" x2="56" y2="52" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#667eea" />
                      <stop offset="1" stopColor="#764ba2" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                1. 정보 입력
              </h3>
              <p style={{ opacity: 0.8, lineHeight: 1.6, margin: 0 }}>
                장르, 주인공 성격, 그리고 원하는 소설의 컨셉을 자유롭게 입력해주세요.
              </p>
            </div>

            {/* Step 2: AI Processing */}
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              borderRadius: 16,
              padding: '2rem',
              border: '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
            }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="32" cy="32" r="20" stroke="url(#grad2)" strokeWidth="2" fill="rgba(102,126,234,0.1)" />
                  <path d="M24 32C24 32 26 28 32 28C38 28 40 32 40 32" stroke="url(#grad2)" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="26" cy="28" r="1.5" fill="url(#grad2)" />
                  <circle cx="38" cy="28" r="1.5" fill="url(#grad2)" />
                  <path d="M28 36C28 36 29 38 32 38C35 38 36 36 36 36" stroke="url(#grad2)" strokeWidth="2" strokeLinecap="round" />
                  <path d="M16 20L20 24M48 20L44 24M16 44L20 40M48 44L44 40" stroke="url(#grad2)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
                  <defs>
                    <linearGradient id="grad2" x1="12" y1="12" x2="52" y2="52" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#667eea" />
                      <stop offset="1" stopColor="#764ba2" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                2. AI 소설 생성
              </h3>
              <p style={{ opacity: 0.8, lineHeight: 1.6, margin: 0 }}>
                Gemini 1.5 Flash 엔진이 입력된 정보를 바탕으로 감성적인 BL 단편 소설을 집필합니다.
              </p>
            </div>

            {/* Step 3: View & Save */}
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              borderRadius: 16,
              padding: '2rem',
              border: '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
            }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="12" y="16" width="18" height="24" rx="2" stroke="url(#grad3)" strokeWidth="2" fill="rgba(102,126,234,0.05)" />
                  <path d="M16 22L18 20L22 24L26 20L28 22" stroke="url(#grad3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="21" cy="30" r="3" stroke="url(#grad3)" strokeWidth="1.5" />
                  <path d="M16 36L20 32L24 36L26 34" stroke="url(#grad3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

                  <path d="M38 24L46 24M38 28L46 28M38 32L46 32M38 36L46 36" stroke="url(#grad3)" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
                  <path d="M52 20L48 24L52 28" stroke="url(#grad3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

                  <rect x="34" y="16" width="18" height="24" rx="2" stroke="url(#grad3)" strokeWidth="2" fill="rgba(118,75,162,0.1)" />
                  <circle cx="43" cy="26" r="4" stroke="url(#grad3)" strokeWidth="1.5" fill="rgba(102,126,234,0.2)" />
                  <path d="M38 34C38 34 40 32 43 32C46 32 48 34 48 34" stroke="url(#grad3)" strokeWidth="1.5" strokeLinecap="round" />

                  <defs>
                    <linearGradient id="grad3" x1="12" y1="16" x2="52" y2="40" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#667eea" />
                      <stop offset="1" stopColor="#764ba2" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                3. 감상 및 저장
              </h3>
              <p style={{ opacity: 0.8, lineHeight: 1.6, margin: 0 }}>
                생성된 소설을 읽고 클립보드에 복사하여 간직하세요.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
