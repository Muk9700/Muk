# Supabase MCP Setup Guide

## 🚀 Quick Start

You've successfully set up the Supabase client! Now you need to add your Supabase credentials.

### Step 1: Get Your Supabase Credentials

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Create a new project (or select an existing one)
3. Go to **Project Settings** → **API**
4. Copy your:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **Anon/Public Key** (starts with `eyJ...`)

### Step 2: Update Environment Variables

Open the `.env.local` file and replace the placeholder values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-actual-anon-key-here
```

### Step 3: Configure Google OAuth in Supabase

1. In your Supabase dashboard, go to **Authentication** → **Providers**
2. Enable **Google** provider
3. Add your Google OAuth credentials:
   - Get them from [Google Cloud Console](https://console.cloud.google.com/)
   - Create OAuth 2.0 credentials
   - Add authorized redirect URI: `https://your-project.supabase.co/auth/v1/callback`
4. Add your site URL in **Authentication** → **URL Configuration**:
   - Site URL: `http://localhost:3000` (for development)
   - Redirect URLs: `http://localhost:3000/**`

### Step 4: Test the Connection

1. Start your development server: `npm run dev`
2. Navigate to `/auth`
3. Click "Continue with Google"
4. Complete the Google sign-in flow
5. You should be redirected back to your app

## 📁 Files Created

- **`.env.local`** - Environment variables (add to `.gitignore`)
- **`lib/supabase/client.ts`** - Supabase client configuration
- **`app/auth/page.tsx`** - Updated with Supabase authentication

## 🔧 Available Functions

From `lib/supabase/client.ts`:

```typescript
import { signInWithGoogle, signOut, getCurrentUser } from '@/lib/supabase/client';

// Sign in with Google
await signInWithGoogle();

// Sign out
await signOut();

// Get current user
const user = await getCurrentUser();
```

## 🎯 Next Steps

1. Add `.env.local` to your `.gitignore` (if not already)
2. Set up authentication state management
3. Create protected routes
4. Add user profile page
5. Configure database tables and policies

## 📚 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Helpers](https://supabase.com/docs/guides/auth)
- [Google OAuth Setup](https://supabase.com/docs/guides/auth/social-login/auth-google)
