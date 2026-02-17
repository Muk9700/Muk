import { supabase } from './client';

// GayArt 타입 정의
export interface GayArt {
    id: string;
    user_id: string;
    original_image_url: string | null;
    original_image_path: string | null;
    generated_image_url: string;
    generated_image_path: string;
    prompt: string | null;
    model_version: string | null;
    generation_time_ms: number | null;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    error_message: string | null;
    created_at: string;
    updated_at: string;
}

// Storage 설정
const STORAGE_BUCKET = 'gayart-images';

/**
 * 사용자의 모든 GayArt 가져오기
 */
export async function getUserGayArts(userId: string, limit = 50) {
    const { data, error } = await supabase
        .from('gayarts')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit);

    if (error) {
        console.error('Error fetching gayarts:', error);
        throw error;
    }

    return data as GayArt[];
}

/**
 * 특정 GayArt 가져오기
 */
export async function getGayArt(id: string) {
    const { data, error } = await supabase
        .from('gayarts')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching gayart:', error);
        throw error;
    }

    return data as GayArt;
}

/**
 * 새로운 GayArt 생성
 */
export async function createGayArt(params: {
    userId: string;
    originalImageUrl?: string;
    originalImagePath?: string;
    generatedImageUrl: string;
    generatedImagePath: string;
    prompt?: string;
    modelVersion?: string;
    generationTimeMs?: number;
    status?: 'pending' | 'processing' | 'completed' | 'failed';
}) {
    const { data, error } = await supabase
        .from('gayarts')
        .insert({
            user_id: params.userId,
            original_image_url: params.originalImageUrl,
            original_image_path: params.originalImagePath,
            generated_image_url: params.generatedImageUrl,
            generated_image_path: params.generatedImagePath,
            prompt: params.prompt,
            model_version: params.modelVersion,
            generation_time_ms: params.generationTimeMs,
            status: params.status || 'completed',
        })
        .select()
        .single();

    if (error) {
        console.error('Error creating gayart:', error);
        throw error;
    }

    return data as GayArt;
}

/**
 * GayArt 업데이트
 */
export async function updateGayArt(
    id: string,
    updates: Partial<Omit<GayArt, 'id' | 'user_id' | 'created_at' | 'updated_at'>>
) {
    const { data, error } = await supabase
        .from('gayarts')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating gayart:', error);
        throw error;
    }

    return data as GayArt;
}

/**
 * GayArt 삭제
 */
export async function deleteGayArt(id: string) {
    const { error } = await supabase
        .from('gayarts')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting gayart:', error);
        throw error;
    }
}

/**
 * 이미지를 Storage에 업로드
 * @param file - 업로드할 파일
 * @param userId - 사용자 ID
 * @param type - 'original' 또는 'generated'
 * @returns 업로드된 파일의 경로와 공개 URL
 */
export async function uploadImage(
    file: File,
    userId: string,
    type: 'original' | 'generated'
): Promise<{ path: string; url: string }> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `${userId}/${type}/${fileName}`;

    const { error: uploadError } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false,
        });

    if (uploadError) {
        console.error('Error uploading image:', uploadError);
        throw uploadError;
    }

    // 공개 URL 가져오기
    const { data: { publicUrl } } = supabase.storage
        .from(STORAGE_BUCKET)
        .getPublicUrl(filePath);

    return {
        path: filePath,
        url: publicUrl,
    };
}

/**
 * Storage에서 이미지 삭제
 */
export async function deleteImage(path: string) {
    const { error } = await supabase.storage
        .from(STORAGE_BUCKET)
        .remove([path]);

    if (error) {
        console.error('Error deleting image:', error);
        throw error;
    }
}

/**
 * GayArt와 관련된 모든 이미지 삭제
 */
export async function deleteGayArtWithImages(id: string) {
    // 먼저 GayArt 정보 가져오기
    const gayart = await getGayArt(id);

    // Storage에서 이미지 삭제
    const pathsToDelete = [
        gayart.original_image_path,
        gayart.generated_image_path,
    ].filter(Boolean) as string[];

    if (pathsToDelete.length > 0) {
        await supabase.storage
            .from(STORAGE_BUCKET)
            .remove(pathsToDelete);
    }

    // 데이터베이스에서 레코드 삭제
    await deleteGayArt(id);
}

/**
 * 사용자의 GayArt 통계 가져오기
 */
export async function getUserGayArtStats(userId: string) {
    const { data, error } = await supabase
        .from('gayarts')
        .select('status')
        .eq('user_id', userId);

    if (error) {
        console.error('Error fetching stats:', error);
        throw error;
    }

    const stats = {
        total: data.length,
        completed: data.filter(g => g.status === 'completed').length,
        processing: data.filter(g => g.status === 'processing').length,
        failed: data.filter(g => g.status === 'failed').length,
        pending: data.filter(g => g.status === 'pending').length,
    };

    return stats;
}
