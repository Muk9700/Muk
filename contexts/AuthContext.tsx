'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase/client';

interface AuthContextType {
    user: User | null;
    session: Session | null;
    loading: boolean;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    session: null,
    loading: true,
    signOut: async () => { },
});

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession()
            .then(({ data: { session }, error }) => {
                if (error) {
                    console.error('Error getting session:', error.message);
                    // 세션 에러 발생 시(ex: Refresh Token 에러) 상태 초기화
                    setSession(null);
                    setUser(null);
                } else {
                    setSession(session);
                    setUser(session?.user ?? null);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error('Unexpected auth error:', err);
                setLoading(false);
            });

        // Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const signOutUser = async () => {
        await supabase.auth.signOut();
        setUser(null);
        setSession(null);
    };

    const value = {
        user,
        session,
        loading,
        signOut: signOutUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
