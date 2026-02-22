'use client';

import React from 'react';

export default function Footer() {
    return (
        <footer style={{
            width: '100%',
            padding: '4rem 2rem 2rem 2rem',
            background: 'linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.4))',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            marginTop: 'auto',
            position: 'relative',
            zIndex: 10,
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.5rem',
                textAlign: 'center',
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                }}>
                    <h3 style={{
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        color: '#ffffff',
                        margin: 0,
                        fontFamily: "'Space Grotesk', sans-serif",
                    }}>
                        Bl_ueHour
                    </h3>
                    <p style={{
                        fontSize: '0.875rem',
                        color: 'rgba(255, 255, 255, 0.5)',
                        margin: 0,
                        maxWidth: '400px',
                        lineHeight: 1.6,
                    }}>
                        Crafting emotional BL narratives with the power of artificial intelligence.
                    </p>
                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    background: 'rgba(255, 255, 255, 0.03)',
                    padding: '1.5rem 2.5rem',
                    borderRadius: '20px',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                }}>
                    <span style={{
                        fontSize: '0.75rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        color: '#a5b4fc',
                        fontWeight: 600,
                    }}>
                        Customer Support & Inquiries
                    </span>
                    <a
                        href="mailto:nextactionclubkr@gmail.com"
                        style={{
                            fontSize: '1.125rem',
                            color: '#ffffff',
                            textDecoration: 'none',
                            fontWeight: 600,
                            transition: 'color 0.2s ease',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#818cf8'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#ffffff'}
                    >
                        nextactionclubkr@gmail.com
                    </a>
                    <p style={{
                        fontSize: '0.8125rem',
                        color: 'rgba(255, 255, 255, 0.4)',
                        margin: 0,
                    }}>
                        For refunds, technical support, or partnership inquiries.
                    </p>
                </div>

                <div style={{
                    marginTop: '1rem',
                    paddingTop: '1.5rem',
                    width: '100%',
                    borderTop: '1px solid rgba(255, 255, 255, 0.03)',
                    display: 'flex',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    color: 'rgba(255, 255, 255, 0.3)',
                }}>
                    © {new Date().getFullYear()} Bl_ueHour. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
