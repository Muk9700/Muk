# 🎨 GayArts 테이블 & 스토리지 설정 가이드

## 📋 개요

이 가이드는 AI로 생성된 이미지를 저장하기 위한 `gayarts` 테이블과 스토리지를 설정하는 방법을 안내합니다.

## 🗄️ 데이터베이스 테이블 구조

### `gayarts` 테이블

| 컬럼명 | 타입 | 설명 |
|--------|------|------|
| `id` | UUID | Primary Key (자동 생성) |
| `user_id` | UUID | 사용자 ID (auth.users 참조) |
| `original_image_url` | TEXT | 원본 이미지 공개 URL |
| `original_image_path` | TEXT | 원본 이미지 스토리지 경로 |
| `generated_image_url` | TEXT | 생성된 이미지 공개 URL |
| `generated_image_path` | TEXT | 생성된 이미지 스토리지 경로 |
| `prompt` | TEXT | 사용자가 입력한 프롬프트 |
| `model_version` | TEXT | 사용된 AI 모델 버전 |
| `generation_time_ms` | INTEGER | 생성 소요 시간 (밀리초) |
| `status` | TEXT | 상태: pending, processing, completed, failed |
| `error_message` | TEXT | 에러 메시지 (실패 시) |
| `created_at` | TIMESTAMP | 생성 시간 |
| `updated_at` | TIMESTAMP | 수정 시간 |

## 📁 스토리지 구조

```
gayart-images/
├── {user_id}/
│   ├── original/
│   │   └── {timestamp}-{random}.{ext}
│   └── generated/
│       └── {timestamp}-{random}.{ext}
```

## 🚀 설정 단계

### 1단계: 데이터베이스 테이블 생성

1. **Supabase SQL Editor 열기**
   - 링크: https://supabase.com/dashboard/project/vgvrzololxxbycfnagrx/editor
   - 왼쪽 메뉴에서 **"SQL Editor"** 클릭
   - **"New query"** 버튼 클릭

2. **SQL 스크립트 실행**
   - `lib/supabase/gayarts_setup.sql` 파일의 내용을 복사
   - SQL Editor에 붙여넣기
   - **"Run"** 버튼 클릭

3. **생성 확인**
   - 왼쪽 메뉴에서 **"Table Editor"** 클릭
   - `gayarts` 테이블이 생성되었는지 확인

### 2단계: Storage Bucket 생성

1. **Storage 페이지 열기**
   - 링크: https://supabase.com/dashboard/project/vgvrzololxxbycfnagrx/storage/buckets
   - 왼쪽 메뉴에서 **"Storage"** 클릭

2. **새 Bucket 생성**
   - **"New bucket"** 버튼 클릭
   - **Bucket name**: `gayart-images`
   - **Public bucket**: ✅ 체크 (이미지를 공개적으로 접근 가능하게)
   - **"Create bucket"** 클릭

3. **Bucket 정책 설정**
   - 생성된 `gayart-images` bucket 클릭
   - **"Policies"** 탭 클릭
   - **"New policy"** 클릭

### 3단계: Storage 정책 설정

SQL Editor로 돌아가서 아래 SQL을 실행:

```sql
-- 인증된 사용자가 자신의 폴더에 업로드 가능
CREATE POLICY "Users can upload own images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'gayart-images' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- 모든 사용자가 이미지를 읽을 수 있음 (Public)
CREATE POLICY "Anyone can view images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'gayart-images');

-- 사용자는 자신의 이미지만 삭제 가능
CREATE POLICY "Users can delete own images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'gayart-images' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );
```

## 💻 사용 방법

### TypeScript 헬퍼 함수 사용

```typescript
import {
  getUserGayArts,
  createGayArt,
  uploadImage,
  deleteGayArtWithImages,
  getUserGayArtStats,
} from '@/lib/supabase/gayarts';

// 1. 이미지 업로드
const file = // ... File 객체
const { path, url } = await uploadImage(file, userId, 'original');

// 2. GayArt 레코드 생성
const gayart = await createGayArt({
  userId: user.id,
  originalImageUrl: originalUrl,
  originalImagePath: originalPath,
  generatedImageUrl: generatedUrl,
  generatedImagePath: generatedPath,
  prompt: 'Make me look more attractive',
  modelVersion: 'v1.0',
  status: 'completed',
});

// 3. 사용자의 모든 GayArt 가져오기
const gayarts = await getUserGayArts(user.id);

// 4. 통계 가져오기
const stats = await getUserGayArtStats(user.id);
console.log(`Total: ${stats.total}, Completed: ${stats.completed}`);

// 5. GayArt 삭제 (이미지 포함)
await deleteGayArtWithImages(gayartId);
```

## 🔒 보안 기능

### Row Level Security (RLS)

- ✅ 사용자는 **자신의 GayArt만** 읽기/생성/수정/삭제 가능
- ✅ 다른 사용자의 데이터에 접근 불가
- ✅ 자동으로 `auth.uid()`로 사용자 확인

### Storage 보안

- ✅ 사용자는 **자신의 폴더에만** 업로드 가능
- ✅ 모든 사용자가 이미지 읽기 가능 (공개 갤러리용)
- ✅ 사용자는 **자신의 이미지만** 삭제 가능

## 📊 주요 기능

### 1. 이미지 업로드 & 저장
```typescript
// 원본 이미지 업로드
const original = await uploadImage(originalFile, userId, 'original');

// 생성된 이미지 업로드
const generated = await uploadImage(generatedFile, userId, 'generated');
```

### 2. 상태 관리
- `pending`: 대기 중
- `processing`: 처리 중
- `completed`: 완료
- `failed`: 실패

### 3. 메타데이터 저장
- 프롬프트
- 모델 버전
- 생성 시간
- 에러 메시지

## 🧪 테스트

### SQL로 테스트 데이터 확인

```sql
-- 모든 GayArt 조회
SELECT * FROM public.gayarts ORDER BY created_at DESC;

-- 특정 사용자의 GayArt 조회
SELECT * FROM public.gayarts WHERE user_id = 'your-user-id';

-- 상태별 통계
SELECT status, COUNT(*) FROM public.gayarts GROUP BY status;
```

## 🐛 문제 해결

### "permission denied for table gayarts"
- RLS 정책이 제대로 설정되었는지 확인
- 사용자가 로그인되어 있는지 확인

### "The resource already exists"
- Bucket 이름이 중복되었을 수 있음
- 다른 이름으로 시도하거나 기존 bucket 삭제

### 이미지 업로드 실패
- Bucket이 생성되었는지 확인
- Storage 정책이 설정되었는지 확인
- 파일 크기 제한 확인 (기본 50MB)

## 📝 다음 단계

1. ✅ SQL 스크립트 실행
2. ✅ Storage Bucket 생성
3. ✅ Storage 정책 설정
4. 🔄 프론트엔드에서 이미지 업로드 기능 구현
5. 🔄 AI 이미지 생성 API 연동
6. 🔄 갤러리 페이지 구현

## 📚 관련 파일

- `lib/supabase/gayarts_setup.sql` - 데이터베이스 설정 SQL
- `lib/supabase/gayarts.ts` - TypeScript 헬퍼 함수
- `lib/supabase/client.ts` - Supabase 클라이언트
