'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase/client';

interface AuthContextType {
    user: User | null;
    session: Session | null;
    loading: boolean;
    signOut: () => Promise<void>;
    credits: number | null;
    refreshCredits: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    session: null,
    loading: true,
    signOut: async () => { },
    credits: null,
    refreshCredits: async () => { },
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
    const [credits, setCredits] = useState<number | null>(null);

    const refreshCredits = async () => {
        if (!user) return;
        try {
            const res = await fetch(`/api/user/credits?userId=${user.id}&t=${Date.now()}`, {
                cache: 'no-store'
            });
            const data = await res.json();
            if (data && typeof data.credits === 'number') {
                setCredits(data.credits);
            }
        } catch (err) {
            console.error('Error refreshing credits:', err);
        }
    };

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession()
            .then(({ data: { session }, error }) => {
                if (error) {
                    console.error('Error getting session:', error.message);
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

    useEffect(() => {
        if (user) {
            refreshCredits();
        } else {
            setCredits(null);
        }
    }, [user]);

    const signOutUser = async () => {
        await supabase.auth.signOut();
        setUser(null);
        setSession(null);
        setCredits(null);
    };

    const value = {
        user,
        session,
        loading,
        signOut: signOutUser,
        credits,
        refreshCredits,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
