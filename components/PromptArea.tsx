import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";

import { cn } from "@/lib/utils";

// --- Radix Primitives ---
const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;
const TooltipContent = React.forwardRef<
    React.ElementRef<typeof TooltipPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & { showArrow?: boolean }
>(({ className, sideOffset = 4, showArrow = false, ...props }, ref) => (
    <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
            ref={ref}
            sideOffset={sideOffset}
            className={cn(
                "relative z-50 max-w-[280px] rounded-md bg-gray-900 text-white px-3 py-1.5 text-xs",
                "animate-in fade-in-0 zoom-in-95",
                "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
                "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
                "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
                className
            )}
            {...props}
        >
            {props.children}
            {showArrow && <TooltipPrimitive.Arrow className="-my-px fill-gray-900" />}
        </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverContent = React.forwardRef<
    React.ElementRef<typeof PopoverPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
    <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
            ref={ref}
            align={align}
            sideOffset={sideOffset}
            className={cn(
                "z-50 w-64 rounded-xl bg-[#303030] p-2 text-white shadow-md outline-none",
                "animate-in data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
                "data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95",
                "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
                "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
                className
            )}
            {...props}
        />
    </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

const Dialog = DialogPrimitive.Root;
const DialogPortal = DialogPrimitive.Portal;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogOverlay = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Overlay>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Overlay
        ref={ref}
        className={cn(
            "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            className
        )}
        {...props}
    />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
    <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
            ref={ref}
            className={cn(
                "fixed left-[50%] top-[50%] z-50 grid w-full max-w-[90vw] md:max-w-[800px]",
                "translate-x-[-50%] translate-y-[-50%] gap-4 border-none bg-transparent p-0",
                "shadow-none duration-300",
                "data-[state=open]:animate-in data-[state=closed]:animate-out",
                "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
                className
            )}
            {...props}
        >
            <div className="relative bg-[#303030] rounded-[28px] overflow-hidden shadow-2xl p-1">
                {children}
                <DialogPrimitive.Close className="absolute right-3 top-3 z-10 rounded-full bg-[#303030] p-1 hover:bg-[#515151] transition-all">
                    <XIcon className="h-5 w-5 text-gray-200 hover:text-white" />
                    <span className="sr-only">Close</span>
                </DialogPrimitive.Close>
            </div>
        </DialogPrimitive.Content>
    </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

// --- SVG Icon Components ---
const SendIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M12 5.25L12 18.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18.75 12L12 5.25L5.25 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

// --- 로딩 오버레이 컴포넌트 (애니메이션) ---
const GeneratingOverlay = () => {
    const { t } = useLanguage();
    const [dots, setDots] = React.useState(".");
    const [phase, setPhase] = React.useState(0);

    const phases = [
        t.dashboard.overlay.phase1,
        t.dashboard.overlay.phase2,
        t.dashboard.overlay.phase3,
        t.dashboard.overlay.phase4,
    ];

    React.useEffect(() => {
        const dotsTimer = setInterval(() => {
            setDots((d) => (d.length >= 3 ? "." : d + "."));
        }, 500);
        const phaseTimer = setInterval(() => {
            setPhase((p) => (p + 1) % phases.length);
        }, 2200);
        return () => {
            clearInterval(dotsTimer);
            clearInterval(phaseTimer);
        };
    }, []);

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 9999,
                background: "rgba(0, 0, 0, 0.85)",
                backdropFilter: "blur(16px)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "2rem",
            }}
        >
            <div style={{ position: "relative", width: 120, height: 120 }}>
                <div style={{
                    position: "absolute",
                    inset: -20,
                    borderRadius: "50%",
                    background: "rgba(102, 126, 234, 0.15)",
                    animation: "pulse-ring 1.8s ease-out infinite",
                }} />
                <div style={{
                    position: "absolute",
                    inset: -8,
                    borderRadius: "50%",
                    background: "rgba(102, 126, 234, 0.2)",
                    animation: "pulse-ring 1.8s ease-out infinite 0.4s",
                }} />
                <div style={{
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 40px rgba(102, 126, 234, 0.6)",
                    animation: "float 2s ease-in-out infinite",
                }}>
                    <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                        <path d="m15 5 4 4" />
                    </svg>
                </div>
            </div>

            <div style={{ textAlign: "center" }}>
                <p style={{
                    fontSize: "1.4rem",
                    fontWeight: 700,
                    color: "#ffffff",
                    margin: 0,
                    fontFamily: "'Space Grotesk', ui-sans-serif, system-ui",
                    minHeight: "2rem",
                    transition: "all 0.3s ease",
                }}>
                    {phases[phase]}{dots}
                </p>
                <p style={{
                    fontSize: "0.9rem",
                    color: "rgba(255,255,255,0.45)",
                    margin: "0.75rem 0 0 0",
                    fontFamily: "'Space Grotesk', ui-sans-serif, system-ui",
                }}>
                    {t.dashboard.overlay.sub}
                </p>
            </div>

            <div style={{
                width: 280,
                height: 4,
                borderRadius: 99,
                background: "rgba(255,255,255,0.1)",
                overflow: "hidden",
            }}>
                <div style={{
                    height: "100%",
                    borderRadius: 99,
                    background: "linear-gradient(90deg, #667eea, #764ba2, #667eea)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 1.5s linear infinite",
                }} />
            </div>

            <style>{`
                @keyframes pulse-ring {
                    0% { transform: scale(0.8); opacity: 0.8; }
                    100% { transform: scale(1.6); opacity: 0; }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-8px); }
                }
                @keyframes shimmer {
                    0% { background-position: 200% center; }
                    100% { background-position: -200% center; }
                }
            `}</style>
        </div>
    );
};

// --- 크레딧 부족 안내 다이얼로그 ---
const IpAbuseDialog = ({ isOpen, onClose, onGoToStore }: { isOpen: boolean, onClose: () => void, onGoToStore: () => void }) => {
    const { t } = useLanguage();
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-[440px] border border-red-500/20 bg-[#1c1c1c]/95 backdrop-blur-2xl">
                <div className="p-8 flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{t.dashboard.dialogs.ipTitle}</h3>
                    <p className="text-white/60 mb-8 leading-relaxed">
                        {t.dashboard.dialogs.ipDesc}
                    </p>
                    <div className="flex gap-3 w-full">
                        <button
                            onClick={onClose}
                            className="flex-1 py-3 px-6 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-semibold transition-all border border-white/5"
                        >
                            {t.dashboard.dialogs.close}
                        </button>
                        <button
                            onClick={onGoToStore}
                            className="flex-1 py-3 px-6 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold transition-all shadow-lg hover:shadow-orange-500/20 active:scale-95"
                        >
                            {t.dashboard.dialogs.goToStore}
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

const NoCreditsDialog = ({ isOpen, onClose, onGoToStore }: { isOpen: boolean, onClose: () => void, onGoToStore: () => void }) => {
    const { t } = useLanguage();
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-[400px] border border-white/10 bg-[#1c1c1c]/95 backdrop-blur-2xl">
                <div className="p-8 flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center mb-6">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{t.dashboard.dialogs.creditsTitle}</h3>
                    <p className="text-white/60 mb-8 leading-relaxed">
                        {t.dashboard.dialogs.creditsDesc}
                    </p>
                    <div className="flex gap-3 w-full">
                        <button
                            onClick={onClose}
                            className="flex-1 py-3 px-6 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-semibold transition-all border border-white/5"
                        >
                            {t.dashboard.dialogs.maybeLater}
                        </button>
                        <button
                            onClick={onGoToStore}
                            className="flex-1 py-3 px-6 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold transition-all shadow-lg hover:shadow-orange-500/20 active:scale-95"
                        >
                            {t.dashboard.dialogs.topUp}
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

// --- The PromptBox Component ---
export const PromptBox = React.forwardRef<
    HTMLTextAreaElement,
    React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
    const { user, credits, refreshCredits, setCredits, loading: authLoading } = useAuth();
    const { t } = useLanguage();
    const router = useRouter();
    const [genre, setGenre] = React.useState("");
    const [personality, setPersonality] = React.useState("");
    const [concept, setConcept] = React.useState("");
    const [isGenerating, setIsGenerating] = React.useState(false);
    const [generatedStory, setGeneratedStory] = React.useState<string | null>(null);
    const [error, setError] = React.useState<string | null>(null);
    const [isNoCredits, setIsNoCredits] = React.useState(false);
    const [isIpAbuse, setIsIpAbuse] = React.useState(false);
    const [copied, setCopied] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!genre.trim() || !personality.trim() || !concept.trim()) {
            setError("Please fill in all fields.");
            return;
        }

        if (!user) {
            setError("Sign in required.");
            return;
        }

        setIsGenerating(true);
        setError(null);
        setGeneratedStory(null);
        setIsNoCredits(false);

        // Simple check before API call
        if (credits !== null && credits < 3) {
            // Need to double check usedCount too, but the API will handle it robustly
        }

        try {
            const response = await fetch('/api/generate-story', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ genre, personality, concept, userId: user.id }),
            });

            if (response.status === 403) {
                const data = await response.json();
                if (data.error === "NO_CREDITS") {
                    setIsNoCredits(true);
                } else if (data.error === "IP_ABUSE") {
                    setIsIpAbuse(true);
                }
                setIsGenerating(false);
                return;
            }

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to generate story');
            }

            setGeneratedStory(data.story);

            // Instantly update credits locally first to feel immediate without network roundtrip,
            // then trigger background refresh to ensure sync.
            if (data.credits !== undefined) {
                setCredits(data.credits);
            }
            refreshCredits();
        } catch (err: any) {
            console.error('Error generating story:', err);
            setError(err.message || 'An error occurred while generating your story.');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleCopy = () => {
        if (!generatedStory) return;
        navigator.clipboard.writeText(generatedStory);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <>
            {isGenerating && <GeneratingOverlay />}

            <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
                <NoCreditsDialog
                    isOpen={isNoCredits}
                    onClose={() => setIsNoCredits(false)}
                    onGoToStore={() => router.push('/store')}
                />
                <IpAbuseDialog
                    isOpen={isIpAbuse}
                    onClose={() => setIsIpAbuse(false)}
                    onGoToStore={() => router.push('/store')}
                />

                {!isNoCredits && (
                    <form onSubmit={handleSubmit} className={cn(
                        "relative flex flex-col gap-4 rounded-[32px] p-6 shadow-[0_8px_32px_rgba(30,27,75,0.4)] transition-all bg-[#0A0D14]/40 backdrop-blur-2xl border border-indigo-500/20 overflow-hidden",
                        className
                    )}>
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent pointer-events-none" />
                        <div className="relative z-10 flex flex-col gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-indigo-100/70 ml-2">{t.dashboard.form.genre}</label>
                                <input
                                    type="text"
                                    value={genre}
                                    onChange={(e) => setGenre(e.target.value)}
                                    placeholder={t.dashboard.form.genrePlaceholder}
                                    className="w-full rounded-2xl bg-[#0A0D14]/50 border border-indigo-500/30 p-3 text-indigo-50 placeholder:text-indigo-200/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-light"
                                    disabled={isGenerating}
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-indigo-100/70 ml-2">{t.dashboard.form.personality}</label>
                                <input
                                    type="text"
                                    value={personality}
                                    onChange={(e) => setPersonality(e.target.value)}
                                    placeholder={t.dashboard.form.personalityPlaceholder}
                                    className="w-full rounded-2xl bg-[#0A0D14]/50 border border-indigo-500/30 p-3 text-indigo-50 placeholder:text-indigo-200/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-light"
                                    disabled={isGenerating}
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-indigo-100/70 ml-2">{t.dashboard.form.concept}</label>
                                <textarea
                                    rows={3}
                                    value={concept}
                                    onChange={(e) => setConcept(e.target.value)}
                                    placeholder={t.dashboard.form.conceptPlaceholder}
                                    className="w-full rounded-2xl bg-[#0A0D14]/50 border border-indigo-500/30 p-3 text-indigo-50 placeholder:text-indigo-200/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all resize-none font-light"
                                    disabled={isGenerating}
                                />
                            </div>
                        </div>

                        <div className="relative z-10 flex items-center justify-between mt-2">
                            <div className="flex flex-col gap-1 pl-2">
                                {authLoading ? (
                                    <span className="text-white/30 text-[0.8rem] animate-pulse flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-ping" />
                                        {t.common.loading}
                                    </span>
                                ) : (
                                    <span style={{
                                        fontSize: "0.85rem",
                                        color: "rgba(255,255,255,0.7)",
                                        fontFamily: "'Space Grotesk', ui-sans-serif, system-ui",
                                        fontWeight: "500"
                                    }}>
                                        💎 {t.dashboard.form.credits}: <strong className="text-white text-base">{credits ?? 0}</strong>
                                    </span>
                                )}
                            </div>
                            <button
                                type="submit"
                                disabled={isGenerating || authLoading}
                                className="group relative flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
                            >
                                {authLoading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        <span>{t.dashboard.form.checking}</span>
                                    </div>
                                ) : (
                                    <>
                                        <SendIcon className="h-5 w-5" />
                                        <span>{t.dashboard.form.button}</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                )}

                {error && (
                    <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 backdrop-blur-md">
                        <p className="text-sm text-red-400 font-medium text-center">
                            ⚠️ {error}
                        </p>
                    </div>
                )}

                {generatedStory && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="rounded-[32px] p-8 bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                    {t.dashboard.result.title}
                                </h3>
                                <button
                                    onClick={handleCopy}
                                    className="px-4 py-2 rounded-full transition-all"
                                    style={{
                                        background: copied ? "rgba(102,234,126,0.2)" : "rgba(255,255,255,0.1)",
                                        color: copied ? "#86efac" : "#ffffff",
                                        border: copied ? "1px solid rgba(102,234,126,0.3)" : "1px solid rgba(255,255,255,0.1)",
                                        fontSize: "0.875rem",
                                        cursor: "pointer",
                                        transition: "all 0.2s ease",
                                    }}
                                >
                                    {copied ? (t.dashboard.result.copied || "✓ Copied!") : (t.dashboard.result.copy || "Copy")}
                                </button>
                            </div>
                            <div className="prose prose-invert max-w-none">
                                <div className="text-white/90 leading-relaxed whitespace-pre-wrap font-serif text-lg">
                                    {generatedStory}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <style>{`
                    @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;700&display=swap');
                    .font-serif {
                        font-family: 'Crimson Pro', serif;
                    }
                `}</style>
            </div>
        </>
    );
});

PromptBox.displayName = "PromptBox";
