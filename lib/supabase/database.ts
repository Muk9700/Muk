import { supabase } from './client';

// Get user profile from database
export async function getUserProfile(userId: string) {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

    if (error) {
        console.error('Error fetching user profile:', error);
        return null;
    }

    return data;
}

// Update user profile
export async function updateUserProfile(
    userId: string,
    updates: {
        full_name?: string;
        avatar_url?: string;
    }
) {
    const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();

    if (error) {
        console.error('Error updating user profile:', error);
        throw error;
    }

    return data;
}
