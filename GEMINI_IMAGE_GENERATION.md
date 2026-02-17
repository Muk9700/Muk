# 🎨 GayArt AI - Gemini 이미지 생성 가이드

## 📝 개요

GayArt AI는 Google의 Gemini 3 Pro Image Preview 모델을 사용하여 고품질 AI 이미지를 생성하는 서비스입니다.

## 🚀 주요 기능

### 1. **텍스트-투-이미지 생성**
- 프롬프트만으로 새로운 이미지 생성
- 2K 해상도, 1:1 비율 지원
- 고급 reasoning 기능으로 복잡한 요청 처리

### 2. **이미지 편집**
- 기존 이미지 업로드 후 텍스트로 수정
- 스타일 변환, 요소 추가/제거
- 고품질 디테일 보존

### 3. **실시간 생성**
- 빠른 응답 시간
- 로딩 상태 표시
- 에러 핸들링

## 🔧 설정

### 1. Gemini API 키 발급

1. [Google AI Studio](https://aistudio.google.com/app/apikey)에 접속
2. "Create API Key" 클릭
3. API 키 복사

### 2. 환경 변수 설정

`.env.local` 파일에 API 키 추가:

```bash
GEMINI_API_KEY=your-actual-api-key-here
```

⚠️ **중요**: `your-gemini-api-key-here`를 실제 API 키로 교체하세요!

## 💡 사용 방법

### 기본 이미지 생성

1. **Dashboard 페이지** 접속
2. **PromptArea**에 원하는 이미지 설명 입력
3. **Send 버튼** 클릭
4. 생성된 이미지 확인 및 다운로드

### 프롬프트 예시

#### 📸 포토리얼리스틱
```
A photorealistic close-up portrait of an elderly Japanese ceramicist 
with deep, sun-etched wrinkles and a warm, knowing smile. 
He is carefully inspecting a freshly glazed tea bowl. 
The setting is his rustic, sun-drenched workshop.
```

#### 🎨 스타일 일러스트
```
A kawaii-style sticker of a happy red panda wearing a tiny bamboo hat. 
It's munching on a green bamboo leaf. The design features bold, 
clean outlines, simple cel-shading, and a vibrant color palette.
```

#### 🏢 제품 목업
```
A high-resolution, studio-lit product photograph of a minimalist 
ceramic coffee mug in matte black, presented on a polished concrete surface.
```

### 이미지 편집

1. **+ 버튼** 클릭하여 원본 이미지 업로드
2. 편집 내용을 텍스트로 입력
   ```
   Using the provided image of my cat, please add a small, 
   knitted wizard hat on its head.
   ```
3. **Send 버튼** 클릭
4. 편집된 이미지 확인

## 🎯 프롬프트 작성 팁

### ✅ 좋은 프롬프트
- **구체적**: "A red car" → "A bright red Ferrari F40 in a modern garage"
- **디테일 포함**: 조명, 각도, 분위기, 스타일 명시
- **문장 형태**: 키워드 나열보다 자연스러운 문장

### ❌ 피해야 할 프롬프트
- 너무 짧거나 모호한 설명
- 키워드만 나열 (예: "cat, hat, wizard, cute")
- 상충되는 요구사항

## 🔍 기술 스택

- **모델**: `gemini-3-pro-image-preview`
- **해상도**: 2K (2048x2048)
- **비율**: 1:1 (정사각형)
- **응답 형식**: Base64 인코딩된 PNG

## 📊 API 사용량

Gemini API는 무료 티어와 유료 티어가 있습니다:

- **무료 티어**: 분당 15 요청
- **유료 티어**: 더 높은 한도

자세한 내용은 [Gemini API 가격 정책](https://ai.google.dev/pricing)을 참조하세요.

## 🐛 문제 해결

### "GEMINI_API_KEY is not configured"
- `.env.local` 파일에 API 키가 올바르게 설정되었는지 확인
- 개발 서버 재시작 (`npm run dev`)

### "No image was generated"
- 프롬프트가 너무 짧거나 모호한지 확인
- API 키가 유효한지 확인
- 네트워크 연결 상태 확인

### 생성이 너무 느림
- Gemini 3 Pro는 고품질을 위해 "thinking" 과정을 거칩니다
- 일반적으로 10-30초 소요
- 더 빠른 생성이 필요하면 `gemini-2.5-flash-image` 모델 사용 고려

## 📚 참고 자료

- [Gemini Image Generation 공식 문서](https://ai.google.dev/gemini-api/docs/image-generation)
- [Google AI Studio](https://aistudio.google.com/)
- [프롬프트 가이드](https://ai.google.dev/gemini-api/docs/image-generation#prompting-guide-and-strategies)

## 🎉 다음 단계

1. 생성된 이미지를 Supabase Storage에 저장
2. `gayarts` 테이블에 메타데이터 기록
3. 갤러리 페이지에서 히스토리 확인
4. 이미지 공유 기능 추가
