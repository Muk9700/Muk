import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useAuth } from "@/contexts/AuthContext";

// --- Utility Function ---
type ClassValue = string | number | boolean | null | undefined;
function cn(...inputs: ClassValue[]): string {
    return inputs.filter(Boolean).join(" ");
}

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
    const [dots, setDots] = React.useState(".");
    const [phase, setPhase] = React.useState(0);

    const phases = [
        "세계관을 설계하는 중...",
        "주인공들을 불러오는 중...",
        "감성을 담아 집필하는 중...",
        "마지막 문장을 완성하는 중...",
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
            {/* 중앙 펄스 원 애니메이션 */}
            <div style={{ position: "relative", width: 120, height: 120 }}>
                {/* 바깥 파동 */}
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
                {/* 메인 원 */}
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
                    {/* 펜 아이콘 */}
                    <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                        <path d="m15 5 4 4" />
                    </svg>
                </div>
            </div>

            {/* 텍스트 */}
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
                    AI가 소설을 집필하고 있습니다. 잠시만 기다려주세요.
                </p>
            </div>

            {/* 하단 진행 바 */}
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

// --- 무료 소진 배너 ---
const FreeLimitBanner = () => (
    <div style={{
        padding: "2rem",
        borderRadius: "24px",
        background: "linear-gradient(135deg, rgba(239,68,68,0.12) 0%, rgba(118,75,162,0.12) 100%)",
        border: "1px solid rgba(239,68,68,0.3)",
        textAlign: "center",
        backdropFilter: "blur(20px)",
    }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📚</div>
        <h3 style={{
            fontSize: "1.25rem",
            fontWeight: 700,
            color: "#fca5a5",
            margin: "0 0 0.75rem 0",
            fontFamily: "'Space Grotesk', ui-sans-serif, system-ui",
        }}>
            무료 생성 기회를 모두 소진했어요
        </h3>
        <p style={{
            fontSize: "0.95rem",
            color: "rgba(255,255,255,0.55)",
            margin: 0,
            lineHeight: 1.7,
            fontFamily: "'Space Grotesk', ui-sans-serif, system-ui",
        }}>
            계정당 <strong style={{ color: "rgba(255,255,255,0.8)" }}>1회</strong>의 무료 소설 생성 기회가 제공됩니다.<br />
            생성된 소설은 아래에서 다시 확인하실 수 있습니다.
        </p>
    </div>
);

// --- The PromptBox Component ---
export const PromptBox = React.forwardRef<
    HTMLTextAreaElement,
    React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
    const { user } = useAuth();
    const [genre, setGenre] = React.useState("");
    const [personality, setPersonality] = React.useState("");
    const [concept, setConcept] = React.useState("");
    const [isGenerating, setIsGenerating] = React.useState(false);
    const [generatedStory, setGeneratedStory] = React.useState<string | null>(null);
    const [error, setError] = React.useState<string | null>(null);
    const [isFreeLimitExceeded, setIsFreeLimitExceeded] = React.useState(false);
    const [copied, setCopied] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!genre.trim() || !personality.trim() || !concept.trim()) {
            setError("모든 필드를 입력해주세요.");
            return;
        }

        if (!user) {
            console.error('[PromptBox] No user found in context');
            setError("로그인이 필요합니다.");
            return;
        }

        console.log('[PromptBox] Submitting story request for user:', user.id);
        setIsGenerating(true);
        setError(null);
        setGeneratedStory(null);

        try {
            const response = await fetch('/api/generate-story', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ genre, personality, concept, userId: user.id }),
            });

            const data = await response.json();

            if (response.status === 403 && data.error === "FREE_LIMIT_EXCEEDED") {
                setIsFreeLimitExceeded(true);
                return;
            }

            if (!response.ok) {
                throw new Error(data.error || 'Failed to generate story');
            }

            setGeneratedStory(data.story);
        } catch (err: any) {
            console.error('Error generating story:', err);
            setError(err.message || '소설 생성 중 오류가 발생했습니다.');
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
            {/* 전체화면 생성 중 오버레이 */}
            {isGenerating && <GeneratingOverlay />}

            <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
                {/* 무료 소진 배너 */}
                {isFreeLimitExceeded && <FreeLimitBanner />}

                {/* 입력 폼 - 소진 시 숨기기 */}
                {!isFreeLimitExceeded && (
                    <form onSubmit={handleSubmit} className={cn(
                        "flex flex-col gap-4 rounded-[32px] p-6 shadow-2xl transition-all bg-white/10 backdrop-blur-xl border border-white/20 dark:bg-[#1e1e1e]/80",
                        className
                    )}>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-white/70 ml-2">장르</label>
                                <input
                                    type="text"
                                    value={genre}
                                    onChange={(e) => setGenre(e.target.value)}
                                    placeholder="예: 현대물, 오메가버스, 캠퍼스물..."
                                    className="w-full rounded-2xl bg-white/5 border border-white/10 p-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                                    disabled={isGenerating}
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-white/70 ml-2">주인공 성격</label>
                                <input
                                    type="text"
                                    value={personality}
                                    onChange={(e) => setPersonality(e.target.value)}
                                    placeholder="예: 까칠한 재벌 3세 수, 다정한 집착공..."
                                    className="w-full rounded-2xl bg-white/5 border border-white/10 p-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                                    disabled={isGenerating}
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-white/70 ml-2">소설 컨셉</label>
                                <textarea
                                    rows={3}
                                    value={concept}
                                    onChange={(e) => setConcept(e.target.value)}
                                    placeholder="원하는 상황이나 특별한 설정을 적어주세요..."
                                    className="w-full rounded-2xl bg-white/5 border border-white/10 p-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all resize-none"
                                    disabled={isGenerating}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                            {/* 무료 1회 안내 */}
                            <span style={{
                                fontSize: "0.8rem",
                                color: "rgba(255,255,255,0.35)",
                                fontFamily: "'Space Grotesk', ui-sans-serif, system-ui",
                            }}>
                                ✨ 계정당 1회 무료 생성
                            </span>
                            <button
                                type="submit"
                                disabled={isGenerating}
                                className="group relative flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100"
                            >
                                <SendIcon className="h-5 w-5" />
                                <span>소설 생성하기</span>
                            </button>
                        </div>
                    </form>
                )}

                {/* Error Display */}
                {error && (
                    <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 backdrop-blur-md">
                        <p className="text-sm text-red-400 font-medium text-center">
                            ⚠️ {error}
                        </p>
                    </div>
                )}

                {/* Generated Story Display */}
                {generatedStory && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="rounded-[32px] p-8 bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                    생성된 단편 소설
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
                                    {copied ? "✓ 복사됨!" : "복사하기"}
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
                    @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;700&display=swap');
                    .font-serif {
                        font-family: 'Noto Serif KR', serif;
                    }
                `}</style>
            </div>
        </>
    );
});

PromptBox.displayName = "PromptBox";
