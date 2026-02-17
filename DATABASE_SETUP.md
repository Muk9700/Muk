# Supabase Database Setup Instructions

## 📋 User Table Setup

이 SQL 스크립트는 Supabase Auth와 자동으로 연동되는 users 테이블을 생성합니다.

### 실행 방법

1. **Supabase Dashboard 접속**
   - https://supabase.com/dashboard 로 이동
   - 프로젝트 선택

2. **SQL Editor 열기**
   - 왼쪽 메뉴에서 "SQL Editor" 클릭
   - "New query" 버튼 클릭

3. **SQL 실행**
   - `lib/supabase/database.sql` 파일의 내용을 복사
   - SQL Editor에 붙여넣기
   - "Run" 버튼 클릭

### 생성되는 것들

#### 1. Users Table
- `id` - Auth user ID와 연결 (Primary Key)
- `email` - 사용자 이메일
- `full_name` - 전체 이름 (Google에서 가져옴)
- `avatar_url` - 프로필 이미지 URL (Google에서 가져옴)
- `created_at` - 생성 시간
- `updated_at` - 수정 시간

#### 2. Row Level Security (RLS)
- 사용자는 자신의 데이터만 읽고 수정 가능
- 보안이 자동으로 적용됨

#### 3. Automatic Triggers
- **on_auth_user_created**: 새 사용자가 Google로 로그인하면 자동으로 users 테이블에 레코드 생성
- **on_user_updated**: updated_at 필드 자동 업데이트

### 작동 방식

1. 사용자가 Google로 로그인
2. Supabase Auth가 사용자 생성
3. Trigger가 자동으로 실행되어 users 테이블에 데이터 저장
4. Google 프로필 정보(이름, 이메일, 프로필 사진)가 자동으로 저장됨

### 확인 방법

SQL Editor에서 실행:
```sql
SELECT * FROM public.users;
```

또는 Table Editor에서 "users" 테이블 확인
