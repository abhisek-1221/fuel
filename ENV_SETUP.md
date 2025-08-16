# Environment Variables Setup

Create a `.env.local` file in the root directory with the following variables:

```env
# Database
NEONDB_URL="your_neondb_connection_string"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
CLERK_SECRET_KEY="your_clerk_secret_key"

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/test"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/onboarding"

# Google AI (for scoring)
GOOGLE_GENERATIVE_AI_API_KEY="your_google_ai_api_key"

# Vapi (for voice conversations)
VAPI_PRIVATE_KEY="your_vapi_private_key"
```

## Setup Instructions

1. **Clerk Setup**: 
   - Go to [Clerk Dashboard](https://clerk.com)
   - Create a new application
   - Copy the publishable key and secret key
   
2. **NeonDB Setup**:
   - Already configured with `NEONDB_URL`
   
3. **Google AI Setup**:
   - Go to [Google AI Studio](https://aistudio.google.com)
   - Create an API key
   
4. **Vapi Setup**:
   - Go to [Vapi Dashboard](https://vapi.ai)
   - Get your private key

## Database Migration

After setting up environment variables, run:

```bash
pnpm prisma generate
pnpm prisma db push
```
