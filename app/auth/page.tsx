'use client';

import Link from 'next/link';
import { signInWithGoogle } from '@/lib/supabase/client';
import { useState } from 'react';

export default function AuthPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGoogleSignIn = async () => {
        try {
            setIsLoading(true);
            setError(null);
            await signInWithGoogle();
            // The OAuth flow will redirect automatically
        } catch (err) {
            console.error('Sign in error:', err);
            setError('Failed to sign in. Please try again.');
            setIsLoading(false);
        }
    };

    return (
        <main style={{
            position: 'relative',
            minHeight: '100vh',
            display: 'flex',
            overflow: 'hidden',
        }}>
            {/* Left Section - 60% */}
            <div style={{
                flex: '3',
                position: 'relative',
                background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2a 100%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: 'min(8vw, 80px)',
            }}>
                {/* Content */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                    {/* LAYBAE Button - Links to laybae.xyz */}
                    <a
                        href="https://laybae.xyz"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'inline-block',
                            textDecoration: 'none',
                            transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-4px)';
                            e.currentTarget.style.filter = 'brightness(1.2)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.filter = 'brightness(1)';
                        }}
                    >
                        <div style={{
                            padding: '16px 32px',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            borderRadius: 16,
                            boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                        }}>
                            <h1 style={{
                                fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                                fontWeight: 800,
                                color: '#ffffff',
                                margin: 0,
                                letterSpacing: '0.05em',
                                fontFamily: "'Space Grotesk', ui-sans-serif, system-ui, -apple-system",
                            }}>
                                LAYBAE
                            </h1>
                            <p style={{
                                fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
                                color: 'rgba(255, 255, 255, 0.9)',
                                margin: '4px 0 0 0',
                                fontWeight: 600,
                                fontFamily: "'Space Grotesk', ui-sans-serif, system-ui, -apple-system",
                            }}>
                                Gay Dating App
                            </p>
                        </div>
                    </a>
                </div>

                {/* Bottom - Gay Art AI */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <h2 style={{
                        fontSize: 'clamp(3rem, 8vw, 7rem)',
                        fontWeight: 900,
                        color: '#ffffff',
                        margin: 0,
                        lineHeight: 0.9,
                        letterSpacing: '-0.02em',
                        fontFamily: "'Space Grotesk', ui-sans-serif, system-ui, -apple-system",
                        textTransform: 'uppercase',
                    }}>
                        Gay Art<br />AI
                    </h2>
                    <p style={{
                        fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                        color: 'rgba(255, 255, 255, 0.7)',
                        marginTop: '1.5rem',
                        maxWidth: '500px',
                        fontFamily: "'Space Grotesk', ui-sans-serif, system-ui, -apple-system",
                    }}>
                        Transform your photos with AI-powered creativity
                    </p>
                </div>
            </div>

            {/* Right Section - 40% */}
            <div style={{
                flex: '2',
                position: 'relative',
                background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 'min(6vw, 64px)',
            }}>
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

                    {/* Terms and Privacy */}
                    <p style={{
                        fontSize: '0.75rem',
                        color: 'rgba(255, 255, 255, 0.5)',
                        textAlign: 'center',
                        marginTop: '2rem',
                        marginBottom: 0,
                        lineHeight: 1.5,
                        fontFamily: "'Space Grotesk', ui-sans-serif, system-ui, -apple-system",
                    }}>
                        By continuing, you agree to our{' '}
                        <a href="#" style={{ color: '#667eea', textDecoration: 'none' }}>Terms of Service</a>
                        {' '}and{' '}
                        <a href="#" style={{ color: '#667eea', textDecoration: 'none' }}>Privacy Policy</a>
                    </p>
                </div>
            </div>

            {/* Font import */}
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700;800;900&display=swap');
            `}</style>
        </main>
    );
}
