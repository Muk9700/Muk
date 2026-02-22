'use client';

import AetherHero from '@/components/main/hero';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Footer from '@/components/main/Footer';

export default function Home() {
  const { user, loading, signOut, credits } = useAuth();
  const router = useRouter();

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
          Syncing...
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
        }}>
          {/* Credit Display */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: 10,
            background: 'rgba(99, 102, 241, 0.2)',
            backdropFilter: 'blur(10px) saturate(120%)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.15)',
            color: '#ffffff',
            fontSize: '0.9rem',
            fontWeight: 600,
            cursor: 'pointer',
          }}
            onClick={() => router.push('/store')}
          >
            <span style={{ color: '#a5b4fc' }}>💎</span>
            <span>{credits ?? 0} Credits</span>
          </div>

          {/* User Info & Logout */}
          <div style={{
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
            <img
              src={user.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${user.email}&background=6366f1&color=fff`}
              alt="Profile"
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                border: '2px solid rgba(255, 255, 255, 0.3)',
              }}
            />
            <span style={{
              color: '#ffffff',
              fontSize: '0.9rem',
              fontWeight: 600,
              fontFamily: "'Space Grotesk', ui-sans-serif, system-ui, -apple-system",
            }}>
              {user.user_metadata?.full_name || 'User'}
            </span>
            <button
              onClick={signOut}
              style={{
                padding: '6px 12px',
                borderRadius: 6,
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#fca5a5',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontFamily: "'Space Grotesk', ui-sans-serif, system-ui, -apple-system",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(239, 68, 68, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)';
              }}
            >
              Log Out
            </button>
          </div>
        </div>
      ) : (
        <div style={{
          position: 'fixed',
          top: 'min(6vw, 32px)',
          right: 'min(6vw, 32px)',
          zIndex: 100,
          display: 'flex',
          gap: '12px',
        }}>
          <Link
            href="/auth"
            style={{
              padding: '10px 24px',
              borderRadius: 10,
              background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
              border: 'none',
              color: '#ffffff',
              textDecoration: 'none',
              fontSize: '0.95rem',
              fontWeight: 600,
              fontFamily: "'Space Grotesk', ui-sans-serif, system-ui, -apple-system",
              boxShadow: '0 4px 15px rgba(99, 102, 241, 0.35)',
              transition: 'all 0.2s ease',
              display: 'inline-block',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(99, 102, 241, 0.45)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(99, 102, 241, 0.35)';
            }}
          >
            Sign In
          </Link>
        </div>
      )}

      {/* Font import */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&display=swap');
      `}</style>

      <AetherHero />

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
            marginBottom: '4rem',
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
            gap: '3rem',
          }}>
            {/* Step 1: Input */}
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              borderRadius: 24,
              padding: '2.5rem',
              border: '1px solid rgba(255,255,255,0.06)',
              backdropFilter: 'blur(10px)',
              textAlign: 'center',
            }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
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
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: '#e0e7ff' }}>
                1. Set the Stage
              </h3>
              <p style={{ opacity: 0.7, lineHeight: 1.7, margin: 0, fontSize: '1rem' }}>
                Choose your genre, protagonist's personality, and a unique concept for your story.
              </p>
            </div>

            {/* Step 2: AI Processing */}
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              borderRadius: 24,
              padding: '2.5rem',
              border: '1px solid rgba(255,255,255,0.06)',
              backdropFilter: 'blur(10px)',
              textAlign: 'center',
            }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
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
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: '#e0e7ff' }}>
                2. AI Manifestation
              </h3>
              <p style={{ opacity: 0.7, lineHeight: 1.7, margin: 0, fontSize: '1rem' }}>
                Our advanced AI crafts a soul-stirring short story based on your creative inputs.
              </p>
            </div>

            {/* Step 3: View & Save */}
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              borderRadius: 24,
              padding: '2.5rem',
              border: '1px solid rgba(255,255,255,0.06)',
              backdropFilter: 'blur(10px)',
              textAlign: 'center',
            }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
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
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: '#e0e7ff' }}>
                3. Read & Cherish
              </h3>
              <p style={{ opacity: 0.7, lineHeight: 1.7, margin: 0, fontSize: '1rem' }}>
                Dive into your story, save your favorites, and share the magic with others.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
