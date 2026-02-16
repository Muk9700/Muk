import AetherHero from '@/components/main/hero';

export default function Home() {
  return (
    <main>
      <AetherHero
        title="Transform Your Photos with GayArt AI"
        subtitle="Upload your portrait and let our AI create stunning, attractive transformations. Enhance your look with confidence and style."
        ctaLabel="Upload Photo"
        ctaHref="#upload"
        secondaryCtaLabel="See Examples"
        secondaryCtaHref="#examples"
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
            {/* Step 1: Upload */}
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
                1. Upload Your Photo
              </h3>
              <p style={{ opacity: 0.8, lineHeight: 1.6, margin: 0 }}>
                Simply upload a portrait photo. Our AI works best with clear, front-facing images.
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
                2. AI Enhancement
              </h3>
              <p style={{ opacity: 0.8, lineHeight: 1.6, margin: 0 }}>
                Our advanced AI analyzes and enhances facial features, style, and overall aesthetics.
              </p>
            </div>

            {/* Step 3: Download */}
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
                3. Get Your Results
              </h3>
              <p style={{ opacity: 0.8, lineHeight: 1.6, margin: 0 }}>
                Download your transformed photo in high quality. Share with confidence!
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
