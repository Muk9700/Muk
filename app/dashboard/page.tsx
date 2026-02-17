'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PromptBox } from '@/components/PromptArea';

export default function DashboardPage() {
    const { user, loading, signOut } = useAuth();
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
                background: 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontFamily: "'Space Grotesk', ui-sans-serif, system-ui, -apple-system",
            }}>
                Loading...
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <main style={{
            minHeight: '100vh',
            background: 'transparent',
            position: 'relative',
        }}>
            {/* Grid background */}
            <div style={{
                position: 'fixed',
                inset: 0,
                backgroundImage: `
                    linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
                pointerEvents: 'none',
                zIndex: 0,
            }} />

            {/* Profile Popover - Top Right */}
            <div
                style={{
                    position: 'fixed',
                    top: '32px',
                    right: '32px',
                    zIndex: 100,
                }}
                onMouseEnter={() => setIsProfileHovered(true)}
                onMouseLeave={() => setIsProfileHovered(false)}
            >
                <div style={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                }}>
                    {/* Profile Picture Button */}
                    <button style={{
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
                    }}>
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

                    {/* Sign Out Button - appears on hover */}
                    <div style={{
                        opacity: isProfileHovered ? 1 : 0,
                        transform: isProfileHovered ? 'translateY(0)' : 'translateY(-8px)',
                        transition: 'all 0.3s ease',
                        pointerEvents: isProfileHovered ? 'auto' : 'none',
                    }}>
                        <button
                            onClick={signOut}
                            style={{
                                padding: '8px 16px',
                                borderRadius: 12,
                                background: 'rgba(239, 68, 68, 0.2)',
                                border: '1px solid rgba(239, 68, 68, 0.4)',
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
                                e.currentTarget.style.background = 'rgba(239, 68, 68, 0.3)';
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.3)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
                            }}
                        >
                            Sign Out
                        </button>
                    </div>
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
                    background: #181818;
                }
            `}</style>
        </main>
    );
}
