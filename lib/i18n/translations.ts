export type Language = 'ko' | 'en' | 'es';

export const translations = {
    ko: {
        common: {
            loading: "동기화 중...",
            signIn: "로그인",
            signOut: "로그아웃",
            credits: "크레딧",
            buyNow: "구매하기",
            preparing: "준비 중...",
            footer: "모든 트랜잭션은 Polar.sh를 통해 안전하게 처리됩니다.",
            nonRefundable: "크레딧은 환불이 불가능하므로 신중하게 선택해 주세요.",
            footerDesc: "인공지능의 힘으로 감동적인 서사를 만들어냅니다.",
            supportTitle: "고객 지원 및 문의",
            supportDesc: "환불, 기술 지원 또는 파트너십 문의."
        },
        hero: {
            badge: "AI 기반 스토리텔링, Bl_ueHour",
            title: "Bl_ueHour",
            subtitle: "상상했던 것보다 더 아름다운 이야기들을 만나보세요. 장르와 컨셉을 선택하기만 하면 당신만의 단편 소설이 탄생합니다.",
            cta: "상상의 세계 탐험하기",
            popularThemes: "인기 테마",
            themeDesc: "Bl_ueHour AI가 만든 감각적인 소설 테마들"
        },
        themes: {
            historical: { title: "영원한 모래", subtitle: "권력과 희생이 얽힌 웅장한 역사적 대서사시" },
            office: { title: "기업의 음모", subtitle: "콘크리트 정글 속의 긴박한 스릴러" },
            fantasy: { title: "비전의 숙명", subtitle: "마법과 칼날이 제국의 운명을 결정짓는 곳" },
            idol: { title: "현대의 명성", subtitle: "디지털 시대, 가려진 화려함의 대가" }
        },
        howItWorks: {
            title: "작동 방식",
            step1: { title: "1. 무대 설정", desc: "장르, 주인공의 성격, 그리고 독특한 컨셉을 선택하세요." },
            step2: { title: "2. AI 발현", desc: "고도의 AI가 당신의 창의적 입력을 바탕으로 영혼을 울리는 이야기를 작성합니다." },
            step3: { title: "3. 감상 및 저장", desc: "이야기 속에 빠져보세요. 좋아하는 이야기를 저장하고 마법을 공유하세요." }
        },
        auth: {
            welcome: "환영합니다",
            desc: "창의적인 여정을 계속하려면 로그인하세요.",
            googleLogin: "Google로 계속하기"
        },
        store: {
            title: "창작의 연료",
            desc: "다음 걸작을 쓸 준비가 되셨나요? 크레딧을 충전하고 상상력을 마음껏 펼쳐보세요.",
            successTitle: "구매 성공!",
            successDesc: "크레딧이 추가되었습니다. 새로운 이야기를 시작해 보세요!",
            basic: "기본 패키지",
            premium: "프리미엄 번들",
            perCredit: "크레딧당"
        },
        dashboard: {
            overlay: {
                phase1: "세계를 설계하는 중",
                phase2: "캐릭터 소환 중",
                phase3: "서사를 엮는 중",
                phase4: "최종 문장 작성 중",
                sub: "AI가 당신의 이야기를 만들고 있습니다. 잠시만 기다려 주세요."
            },
            dialogs: {
                ipTitle: "무료 체험이 이미 사용되었습니다.",
                ipDesc: "이 기기나 네트워크에서 이미 무료 이야기가 생성되었습니다. 계속하려면 크레딧을 구매해 주세요!",
                creditsTitle: "무료 크레딧을 모두 사용하셨습니다.",
                creditsDesc: "더 많은 이야기를 만들고 싶으신가요? 크레딧을 충전하여 마법을 이어가세요!",
                close: "닫기",
                maybeLater: "나중에 하기",
                goToStore: "상점으로 가기",
                topUp: "충전하기"
            },
            form: {
                genre: "장르",
                genrePlaceholder: "예: 현대물, 오메가버스, 캠퍼스물...",
                personality: "캐릭터 성격",
                personalityPlaceholder: "예: 츤데레 재벌3세, 다정하지만 집착 있는 공...",
                concept: "플롯 컨셉",
                conceptPlaceholder: "배경이나 구체적인 플롯 포인트를 설명해 주세요...",
                button: "이야기 발현하기",
                checking: "확인 중...",
                credits: "보유 크레딧"
            },
            result: {
                title: "당신의 AI 맞춤형 이야기",
                copy: "복사",
                copied: "복사됨!"
            },
            paymentSuccess: "결제가 성공적으로 완료되었습니다! {credits} 크레딧이 지급되었습니다."
        }
    },
    en: {
        common: {
            loading: "Syncing...",
            signIn: "Sign In",
            signOut: "Log Out",
            credits: "Credits",
            buyNow: "Buy Now",
            preparing: "Preparing...",
            footer: "All transactions are securely processed by Polar.sh.",
            nonRefundable: "Credits are non-refundable. Please choose your package thoughtfully.",
            footerDesc: "Crafting beautiful narratives with the power of artificial intelligence.",
            supportTitle: "Customer Support & Inquiries",
            supportDesc: "For refunds, technical support, or partnership inquiries."
        },
        hero: {
            badge: "AI-Powered Storytelling, Bl_ueHour",
            title: "Bl_ueHour",
            subtitle: "The most beautiful narratives you've ever imagined. Simply choose a genre and concept to manifest your exclusive short story.",
            cta: "Explore Your Imagination",
            popularThemes: "Popular Themes",
            themeDesc: "Cinematic narratives crafted by Bl_ueHour AI"
        },
        themes: {
            historical: { title: "Eternal Sands", subtitle: "A sweeping historical epic of power and sacrifice" },
            office: { title: "Corporate Intrigue", subtitle: "A high-stakes thriller in the concrete jungle" },
            fantasy: { title: "Arcane Destiny", subtitle: "Where magic and swords determine the fate of empires" },
            idol: { title: "Modern Fame", subtitle: "The hidden price of the spotlight in the digital age" }
        },
        howItWorks: {
            title: "How It Works",
            step1: { title: "1. Set the Stage", desc: "Choose your genre, protagonist's personality, and a unique concept for your story." },
            step2: { title: "2. AI Manifestation", desc: "Our advanced AI crafts a soul-stirring short story based on your creative inputs." },
            step3: { title: "3. Read & Cherish", desc: "Dive into your story, save your favorites, and share the magic with others." }
        },
        auth: {
            welcome: "Welcome Back",
            desc: "Sign in to continue your creative journey",
            googleLogin: "Continue with Google"
        },
        store: {
            title: "Fuel Your Creativity",
            desc: "Ready to write your next masterpiece? Top up your credits and let your imagination roam free.",
            successTitle: "Purchase Successful!",
            successDesc: "Your credits have been added. Start writing your next story!",
            basic: "Basic Package",
            premium: "Premium Bundle",
            perCredit: "per credit"
        },
        dashboard: {
            overlay: {
                phase1: "Architecting the world",
                phase2: "Summoning characters",
                phase3: "Weaving the narrative",
                phase4: "Writing final lines",
                sub: "Our AI is crafting your story. Please wait a moment."
            },
            dialogs: {
                ipTitle: "Free trial already claimed.",
                ipDesc: "A free story has already been generated from this device or network. Please purchase credits to continue!",
                creditsTitle: "You've used your free credit.",
                creditsDesc: "Want to create more stories? Top up your credits to keep the magic going!",
                close: "Close",
                maybeLater: "Maybe Later",
                goToStore: "Go to Store",
                topUp: "Top Up"
            },
            form: {
                genre: "Genre",
                genrePlaceholder: "e.g., Contemporary, Omegaverse, Campus...",
                personality: "Character Personality",
                personalityPlaceholder: "e.g., Tsundere CEO, Sweet but obsessive top...",
                concept: "Plot Concept",
                conceptPlaceholder: "Describe the setting or specific plot points...",
                button: "Manifest Story",
                checking: "Checking...",
                credits: "Credits"
            },
            result: {
                title: "Your AI-Crafted Story",
                copy: "Copy",
                copied: "Copied!"
            },
            paymentSuccess: "Payment successfully completed! {credits} credits have been added."
        }
    },
    es: {
        common: {
            loading: "Sincronizando...",
            signIn: "Iniciar Sesión",
            signOut: "Cerrar Sesión",
            credits: "Créditos",
            buyNow: "Comprar Ahora",
            preparing: "Preparando...",
            footer: "Todas las transacciones son procesadas de forma segura por Polar.sh.",
            nonRefundable: "Los créditos no son reembolsables. Por favor, elija su paquete con cuidado.",
            footerDesc: "Creando bellas narrativas con el poder de la inteligencia artificial.",
            supportTitle: "Soporte al cliente y consultas",
            supportDesc: "Para reembolsos, soporte técnico o consultas de asociación."
        },
        hero: {
            badge: "Narración impulsada por IA, Bl_ueHour",
            title: "Bl_ueHour",
            subtitle: "Las narrativas más bellas que jamás hayas imaginado. Simplemente elige un género y un concepto para manifestar tu historia corta exclusiva.",
            cta: "Explora tu imaginación",
            popularThemes: "Temas populares",
            themeDesc: "Narrativas cinematográficas creadas por Bl_ueHour AI"
        },
        themes: {
            historical: { title: "Arenas Eternas", subtitle: "Una epopeya histórica de poder y sacrificio" },
            office: { title: "Intriga Corporativa", subtitle: "Un thriller de alto riesgo en la jungla de asfalto" },
            fantasy: { title: "Destino Arcano", subtitle: "Donde la magia y las espadas deciden el destino de los imperios" },
            idol: { title: "Fama Moderna", subtitle: "El precio oculto del estrellato en la era digital" }
        },
        howItWorks: {
            title: "Cómo funciona",
            step1: { title: "1. Prepara el escenario", desc: "Elige tu género, la personalidad del protagonista y un concepto único para tu historia." },
            step2: { title: "2. Manifestación de IA", desc: "Nuestra IA avanzada crea una historia corta conmovedora basada en tus ideas creativas." },
            step3: { title: "3. Lee y disfruta", desc: "Sumérgete en tu historia, guarda tus favoritas y comparte la magia con otros." }
        },
        auth: {
            welcome: "Bienvenido de nuevo",
            desc: "Inicia sesión para continuar tu viaje creativo",
            googleLogin: "Continuar con Google"
        },
        store: {
            title: "Alimenta tu creatividad",
            desc: "¿Listo para escribir tu próxima obra maestra? Recarga tus créditos y deja volar tu imaginación.",
            successTitle: "¡Compra exitosa!",
            successDesc: "Tus créditos han sido añadidos. ¡Empieza a escribir tu próxima historia!",
            basic: "Paquete Básico",
            premium: "Paquete Premium",
            perCredit: "por crédito"
        },
        dashboard: {
            overlay: {
                phase1: "Arquitectando el mundo",
                phase2: "Invocando personajes",
                phase3: "Tejiendo la narrativa",
                phase4: "Escribiendo líneas finales",
                sub: "Nuestra IA está creando tu historia. Por favor espera un momento."
            },
            dialogs: {
                ipTitle: "Prueba gratuita ya reclamada.",
                ipDesc: "Ya se ha generado una historia gratuita desde este dispositivo o red. ¡Por favor compra créditos para continuar!",
                creditsTitle: "Has usado tu crédito gratuito.",
                creditsDesc: "¿Quieres crear más historias? ¡Recarga tus créditos para seguir con la magia!",
                close: "Cerrar",
                maybeLater: "Más tarde",
                goToStore: "Ir a la tienda",
                topUp: "Recargar"
            },
            form: {
                genre: "Género",
                genrePlaceholder: "ej., Contemporáneo, Omegaverse, Campus...",
                personality: "Personalidad del personaje",
                personalityPlaceholder: "ej., CEO Tsundere, Top dulce pero obsesivo...",
                concept: "Concepto de la trama",
                conceptPlaceholder: "Describe el entorno o puntos específicos de la trama...",
                button: "Manifestar historia",
                checking: "Comprobando...",
                credits: "Créditos"
            },
            result: {
                title: "Tu historia creada por IA",
                copy: "Copiar",
                copied: "¡Copiado!"
            },
            paymentSuccess: "¡Pago completado con éxito! Se han añadido {credits} créditos."
        }
    }
};
