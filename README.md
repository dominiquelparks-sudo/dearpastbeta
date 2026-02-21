# Dear Past Beta

A Next.js application for journaling and personal content management, using Prisma, NextAuth, AWS S3, and Stripe.

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) v9 or higher
- A [PostgreSQL](https://www.postgresql.org/) database
- (Optional) AWS S3 bucket for file storage
- (Optional) Stripe account for payments

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy the example environment file and fill in your values:

```bash
cp .env.example .env.local
```

Open `.env.local` and set each variable:

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string, e.g. `postgresql://user:password@localhost:5432/dearpast` |
| `NEXTAUTH_SECRET` | Random secret for NextAuth – generate with `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Public URL of the app, e.g. `http://localhost:3000` |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `SMTP_HOST` | SMTP server hostname for magic-link emails |
| `SMTP_PORT` | SMTP server port (default `465`) |
| `SMTP_USER` | SMTP username |
| `SMTP_PASSWORD` | SMTP password |
| `EMAIL_FROM` | From address for auth emails |
| `AWS_ACCESS_KEY_ID` | AWS access key for S3 |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key for S3 |
| `AWS_REGION` | AWS region, e.g. `us-east-1` |
| `AWS_S3_BUCKET` | S3 bucket name |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `NEXT_PUBLIC_APP_URL` | Public URL of the app |

### 3. Set up the database

Push the Prisma schema to your database:

```bash
npx prisma db push
```

To also seed the database (if a seed file exists):

```bash
npx prisma db seed
```

### 4. Generate the Prisma client

```bash
npx prisma generate
```

### 5. Start the development server

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |
| `npx prisma studio` | Open Prisma Studio to browse the database |

## First-time project bootstrap

If you are setting up this project from scratch (not cloning an existing repo), run the provided setup script:

```bash
chmod +x setup.sh
./setup.sh
```

This will scaffold the Next.js app, install all dependencies, initialise Prisma, and create a starter `.env.local` file.

## Deploying to Vercel

[Vercel](https://vercel.com) is the recommended hosting platform for this Next.js app.

### Quick deploy

1. Push this repository to GitHub (it already contains `vercel.json`).
2. Go to [vercel.com/new](https://vercel.com/new) and import your repository.
3. In the **Environment Variables** section, add every variable from `.env.example` with your real values.
4. Click **Deploy**. Vercel will run `npm install`, `npx prisma generate`, and `next build` automatically.

### Database on Vercel

Vercel does not provide a PostgreSQL database by default. Options:

| Provider | Notes |
|---|---|
| [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres) | One-click setup in the Vercel dashboard |
| [Neon](https://neon.tech) | Serverless Postgres, free tier available |
| [Supabase](https://supabase.com) | Postgres with extras, free tier available |
| [Railway](https://railway.app) | Managed Postgres, simple setup |

After provisioning your database, copy the connection string into the `DATABASE_URL` environment variable in Vercel, then run:

```bash
npx prisma db push
```

### Updating NEXTAUTH_URL

Set `NEXTAUTH_URL` to your Vercel deployment URL (e.g. `https://dearpastbeta.vercel.app`) in the Vercel environment variables.
