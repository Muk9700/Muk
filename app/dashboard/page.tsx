'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PromptBox } from '@/components/PromptArea';
import Footer from '@/components/main/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from '@/components/main/LanguageSelector';

export default function DashboardPage() {
    const { user, loading, signOut } = useAuth();
    const { t } = useLanguage();
    const router = useRouter();
    const [isProfileHovered, setIsProfileHovered] = useState(false);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/auth');
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div style={{
                minHeight: '100vh',
                background: '#0A0D14',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontFamily: "'Space Grotesk', ui-sans-serif, system-ui, -apple-system",
            }}>
                {t.common.loading}
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <main style={{
            minHeight: '100vh',
            background: '#0A0D14',
            position: 'relative',
        }}>
            {/* Background Gradients */}
            <div style={{
                position: 'fixed',
                inset: 0,
                zIndex: 0,
                background: 'linear-gradient(to bottom, #0A0D14, #10142A, #1D1739)',
            }}>
                <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '40%', height: '40%', background: '#3b82f6', borderRadius: '50%', filter: 'blur(120px)', opacity: 0.15 }} />
                <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '50%', height: '50%', background: '#8b5cf6', borderRadius: '50%', filter: 'blur(150px)', opacity: 0.15 }} />

                <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `
                        linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px',
                    pointerEvents: 'none',
                }} />
            </div>

            {/* Home Navigation Button - Top Left */}
            <div style={{
                position: 'fixed',
                top: '32px',
                left: '32px',
                zIndex: 100,
            }}>
                <button
                    onClick={() => router.push('/')}
                    title="Back to Home"
                    style={{
                        width: 48,
                        height: 48,
                        borderRadius: '16px',
                        background: 'rgba(255, 255, 255, 0.12)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: '#ffffff',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                        e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    }}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                </button>
            </div>

            {/* Profile & Credits - Top Right */}
            <div
                style={{
                    position: 'fixed',
                    top: '32px',
                    right: '32px',
                    zIndex: 100,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: '12px',
                }}
                onMouseEnter={() => setIsProfileHovered(true)}
                onMouseLeave={() => setIsProfileHovered(false)}
            >
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                }}>
                    <LanguageSelector />
                    {/* Store Link Button */}
                    <button
                        onClick={() => router.push('/store')}
                        title="Top Up Credits"
                        style={{
                            height: 48,
                            padding: '0 20px',
                            borderRadius: '16px',
                            background: 'rgba(99, 102, 241, 0.2)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(99, 102, 241, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            cursor: 'pointer',
                            color: '#ffffff',
                            fontWeight: 600,
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(99, 102, 241, 0.3)';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 8px 20px rgba(99, 102, 241, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(99, 102, 241, 0.2)';
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
                        }}
                    >
                        <span style={{ fontSize: '1.2rem' }}>💎</span>
                        <span style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{t.dashboard.dialogs.topUp}</span>
                    </button>

                    {/* Profile Picture Button */}
                    <button
                        style={{
                            width: 48,
                            height: 48,
                            borderRadius: '50%',
                            border: '2px solid rgba(255, 255, 255, 0.3)',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            transform: isProfileHovered ? 'scale(1.05)' : 'scale(1)',
                            boxShadow: isProfileHovered
                                ? '0 8px 24px rgba(0, 0, 0, 0.4)'
                                : '0 4px 12px rgba(0, 0, 0, 0.2)',
                            background: '#303030',
                        }}
                    >
                        {user.user_metadata?.avatar_url ? (
                            <img
                                src={user.user_metadata.avatar_url}
                                alt="Profile"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                        ) : (
                            <div style={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#ffffff',
                                fontSize: '1.25rem',
                                fontWeight: 600,
                            }}>
                                {user.email?.charAt(0).toUpperCase()}
                            </div>
                        )}
                    </button>
                </div>

                {/* Log Out Button - appears below on hover */}
                <div style={{
                    opacity: isProfileHovered ? 1 : 0,
                    transform: isProfileHovered ? 'translateY(0)' : 'translateY(-8px)',
                    transition: 'all 0.3s ease',
                    pointerEvents: isProfileHovered ? 'auto' : 'none',
                }}>
                    <button
                        onClick={signOut}
                        style={{
                            padding: '8px 20px',
                            borderRadius: 12,
                            background: 'rgba(239, 68, 68, 0.15)',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            color: '#fca5a5',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            fontFamily: "'Space Grotesk', ui-sans-serif, system-ui, -apple-system",
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                            whiteSpace: 'nowrap',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.25)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)';
                        }}
                    >
                        {t.common.signOut}
                    </button>
                </div>
            </div>

            {/* Center Content - PromptBox */}
            <div style={{
                position: 'relative',
                zIndex: 1,
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '64px 32px',
            }}>
                <div style={{
                    width: '100%',
                    maxWidth: '800px',
                }}>
                    <PromptBox />
                </div>
            </div>

            {/* Font import */}
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700;800;900&display=swap');
                
                body {
                    background: #0A0D14;
                    margin: 0;
                }
            `}</style>
            <Footer />
        </main>
    );
}
