#!/usr/bin/env bash
set -e

# Create project directory
mkdir dearpast && cd dearpast

# Initialize Node project
npm init -y

# Install Next.js and dependencies
npx create-next-app@latest . --typescript --tailwind --app

# Install additional packages
npm install \
  next-auth@5.0.0-beta.17 \
  @prisma/client \
  prisma \
  zod \
  @hookform/resolvers \
  react-hook-form \
  @aws-sdk/client-s3 \
  stripe \
  pdfkit \
  @types/pdfkit \
  date-fns \
  uuid \
  papaparse \
  tsx

# Dev dependencies
npm install -D \
  @types/papaparse \
  @types/uuid

# Initialize Prisma
npx prisma init

# Generate Prisma client
npx prisma generate

# Set up environment variables
NEXTAUTH_SECRET_VALUE=$(openssl rand -base64 32)
cat > .env.local << EOF
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/dearpast"

# NextAuth
NEXTAUTH_SECRET="${NEXTAUTH_SECRET_VALUE}"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"

# Email / Magic Links
SMTP_HOST="smtp.example.com"
SMTP_PORT="465"
SMTP_USER="your_smtp_username"
SMTP_PASSWORD="your_smtp_password"
EMAIL_FROM="noreply@yourdomain.com"

# AWS S3
AWS_ACCESS_KEY_ID="your_access_key"
AWS_SECRET_ACCESS_KEY="your_secret_key"
AWS_REGION="us-east-1"
AWS_S3_BUCKET="dearpast-bucket"

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
EOF

# Create directory structure
mkdir -p src/{app,components,lib,utils,hooks,types,auth}
mkdir -p public/uploads

# Output completion message
echo "✅ Dependencies installed!"
echo "⚠️  Update .env.local with your actual API keys"
echo "ℹ️  Run 'npx prisma db push' to set up your database"
echo "🚀 Run 'npm run dev' to start the development server"