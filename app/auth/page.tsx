'use client';

import Link from 'next/link';
import { signInWithGoogle } from '@/lib/supabase/client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Footer from '@/components/main/Footer';

export default function AuthPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuth();
    const router = useRouter();

    // Redirect to dashboard if already logged in
    useEffect(() => {
        if (user) {
            router.push('/dashboard');
        }
    }, [user, router]);

    const handleGoogleSignIn = async () => {
        try {
            setIsLoading(true);
            setError(null);
            await signInWithGoogle();
            // The OAuth flow will redirect automatically to /dashboard
        } catch (err) {
            console.error('Sign in error:', err);
            setError('Failed to sign in. Please try again.');
            setIsLoading(false);
        }
    };

    return (
        <main className="auth-main">
            {/* Left Section - 60% */}
            <div className="auth-left">
                {/* Artwork Background Layers */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-overlay animate-pulse"
                        style={{ backgroundImage: 'url("/images/theme_fantasy.webp")', animationDuration: '8s' }} />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0A0D14] via-[#0A0D14]/80 to-transparent z-10" />

                    {/* Floating Illustration Cards */}
                    <div className="absolute top-[10%] right-[10%] w-64 h-80 rounded-3xl overflow-hidden border border-white/10 shadow-2xl rotate-3 opacity-60 hidden xl:block animate-float">
                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("/images/theme_historical.webp")' }} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    <div className="absolute bottom-[15%] left-[15%] w-56 h-72 rounded-3xl overflow-hidden border border-white/10 shadow-2xl -rotate-6 opacity-50 hidden xl:block animate-float-delayed">
                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("/images/theme_office.webp")' }} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                </div>

                {/* Content */}
                <div style={{ position: 'relative', zIndex: 10 }} className="flex flex-col gap-8">
                    <div style={{
                        display: 'inline-block',
                        alignSelf: 'flex-start',
                        padding: '12px 24px',
                        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.4) 0%, rgba(118, 75, 162, 0.4) 100%)',
                        borderRadius: 16,
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                    }}>
                        <span style={{
                            fontSize: 'clamp(0.85rem, 1.2vw, 1rem)',
                            fontWeight: 700,
                            color: '#ffffff',
                            letterSpacing: '0.15em',
                            fontFamily: "'Space Grotesk', ui-sans-serif, system-ui",
                            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                        }}>
                            BLUE HOUR • NOVEL AI
                        </span>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h2 style={{
                            fontSize: 'clamp(3.5rem, 8vw, 8rem)',
                            fontWeight: 900,
                            color: '#ffffff',
                            margin: 0,
                            lineHeight: 0.9,
                            letterSpacing: '-0.04em',
                            fontFamily: "'Space Grotesk', ui-sans-serif, system-ui",
                            textTransform: 'uppercase',
                        }}>
                            BL<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">AI NOVELIST</span>
                        </h2>
                        <div className="w-24 h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
                        <p style={{
                            fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                            color: 'rgba(255, 255, 255, 0.9)',
                            marginTop: '1rem',
                            maxWidth: '540px',
                            fontFamily: "'Space Grotesk', ui-sans-serif, system-ui",
                            lineHeight: 1.6,
                            fontWeight: 300,
                        }}>
                            Just input a <strong className="text-indigo-300 font-semibold">genre, personality, and concept</strong>, and we&apos;ll weave a soul-stirring story tailored just for you.
                        </p>
                    </div>

                    {/* Theme Badges */}
                    <div className="flex flex-wrap gap-3 mt-4">
                        {['Moonlit Romance', 'Office Secrets', 'Arcane Destiny', 'Backstage Glances'].map(theme => (
                            <span key={theme} className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/60 backdrop-blur-md">
                                #{theme}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Section - 40% */}
            <div className="auth-right">
                {/* Back button - top left of right section */}
                <Link
                    href="/"
                    style={{
                        position: 'absolute',
                        top: 'min(6vw, 32px)',
                        left: 'min(6vw, 32px)',
                        zIndex: 100,
                        width: 44,
                        height: 44,
                        borderRadius: 10,
                        background: 'rgba(255, 255, 255, 0.12)',
                        backdropFilter: 'blur(10px) saturate(120%)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textDecoration: 'none',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                        transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.18)';
                        e.currentTarget.style.transform = 'translateX(-2px)';
                        e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.25)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                        e.currentTarget.style.transform = 'translateX(0)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                    }}
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.5 15L7.5 10L12.5 5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Link>

                {/* Auth card */}
                <div style={{
                    width: '100%',
                    maxWidth: 440,
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(20px) saturate(120%)',
                    borderRadius: 24,
                    padding: 'clamp(2rem, 5vw, 3rem)',
                    boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.15), 0 20px 60px rgba(0, 0, 0, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                }}>
                    {/* Welcome message */}
                    <div style={{
                        textAlign: 'center',
                        marginBottom: '2rem',
                    }}>
                        <h2 style={{
                            fontSize: '1.75rem',
                            fontWeight: 700,
                            color: '#ffffff',
                            margin: 0,
                            marginBottom: '0.5rem',
                            fontFamily: "'Space Grotesk', ui-sans-serif, system-ui, -apple-system",
                        }}>
                            Welcome Back
                        </h2>
                        <p style={{
                            fontSize: '0.95rem',
                            color: 'rgba(255, 255, 255, 0.6)',
                            margin: 0,
                            fontFamily: "'Space Grotesk', ui-sans-serif, system-ui, -apple-system",
                        }}>
                            Sign in to continue your creative journey
                        </p>
                    </div>

                    {/* Google Sign In Button */}
                    <button
                        onClick={handleGoogleSignIn}
                        disabled={isLoading}
                        style={{
                            width: '100%',
                            padding: '14px 24px',
                            borderRadius: 12,
                            background: isLoading ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.95)',
                            border: 'none',
                            cursor: isLoading ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '12px',
                            fontSize: '1rem',
                            fontWeight: 600,
                            color: '#1f2937',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                            transition: 'all 0.2s ease',
                            fontFamily: "'Space Grotesk', ui-sans-serif, system-ui, -apple-system",
                            opacity: isLoading ? 0.7 : 1,
                        }}
                        onMouseEnter={(e) => {
                            if (!isLoading) {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.25)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!isLoading) {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                            }
                        }}
                    >
                        {/* Google Logo SVG */}
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.6 10.227c0-.709-.064-1.39-.182-2.045H10v3.868h5.382a4.6 4.6 0 01-1.996 3.018v2.51h3.232c1.891-1.742 2.982-4.305 2.982-7.35z" fill="#4285F4" />
                            <path d="M10 20c2.7 0 4.964-.895 6.618-2.423l-3.232-2.509c-.895.6-2.04.955-3.386.955-2.605 0-4.81-1.76-5.595-4.123H1.064v2.59A9.996 9.996 0 0010 20z" fill="#34A853" />
                            <path d="M4.405 11.9c-.2-.6-.314-1.24-.314-1.9 0-.66.114-1.3.314-1.9V5.51H1.064A9.996 9.996 0 000 10c0 1.614.386 3.14 1.064 4.49l3.34-2.59z" fill="#FBBC05" />
                            <path d="M10 3.977c1.468 0 2.786.505 3.823 1.496l2.868-2.868C14.959.99 12.695 0 10 0 6.09 0 2.71 2.24 1.064 5.51l3.34 2.59C5.19 5.736 7.395 3.977 10 3.977z" fill="#EA4335" />
                        </svg>
                        {isLoading ? 'Signing in...' : 'Continue with Google'}
                    </button>

                    {/* Error message */}
                    {error && (
                        <div style={{
                            marginTop: '1rem',
                            padding: '12px',
                            borderRadius: 8,
                            background: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            color: '#fca5a5',
                            fontSize: '0.875rem',
                            textAlign: 'center',
                            fontFamily: "'Space Grotesk', ui-sans-serif, system-ui, -apple-system",
                        }}>
                            {error}
                        </div>
                    )}

                    {/* Terms removed */}
                </div>
            </div>

            {/* Font import & Mobile Responsive Styles */}
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700;800;900&display=swap');
                
                .auth-main {
                    position: relative;
                    min-height: 100vh;
                    display: flex;
                    overflow-x: hidden;
                }
                
                /* 모바일 화면 대응 강화를 위해 z-index 조정 */
                .auth-left {
                    flex: 3;
                    position: relative;
                    background: #0A0D14;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    padding: min(8vw, 80px);
                    overflow: hidden;
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0) rotate(3deg); }
                    50% { transform: translateY(-20px) rotate(4deg); }
                }
                @keyframes float-delayed {
                    0%, 100% { transform: translateY(0) rotate(-6deg); }
                    50% { transform: translateY(-15px) rotate(-5deg); }
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                .animate-float-delayed {
                    animation: float-delayed 8s ease-in-out infinite;
                }
                
                .auth-right {
                    flex: 2;
                    position: relative;
                    background: radial-gradient(circle at center, #1a1a2a 0%, #0A0D14 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: min(6vw, 64px);
                    box-shadow: -20px 0 60px rgba(0,0,0,0.5);
                    z-index: 20;
                }
                
                /* Mobile Responsive: 768px 이하 */
                @media (max-width: 768px) {
                    .auth-main {
                        flex-direction: column;
                        overflow-y: auto;
                    }
                    
                    .auth-left {
                        flex: none;
                        min-height: 40vh;
                        padding: 32px 24px;
                        justify-content: center;
                        gap: 32px;
                    }
                    
                    .auth-right {
                        flex: none;
                        min-height: 60vh;
                        padding: 32px 24px;
                    }
                }
                
                /* Very Small Mobile: 480px 이하 */
                @media (max-width: 480px) {
                    .auth-left {
                        padding: 24px 16px;
                        gap: 24px;
                    }
                    
                    .auth-right {
                        padding: 24px 16px;
                    }
                }
            `}</style>
            <Footer />
        </main>
    );
}
