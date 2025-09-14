# Project Setup Guide

This guide will help you set up the project with all required services and configurations.

## 1. Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/your_database_name?schema=public"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-key-here"

# Stripe
STRIPE_PUBLISHABLE_KEY="pk_test_your_stripe_publishable_key_here"
STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key_here"
STRIPE_WEBHOOK_SECRET="whsec_your_stripe_webhook_secret_here"

# Resend
RESEND_API_KEY="re_your_resend_api_key_here"

# Email
FROM_EMAIL="noreply@yourdomain.com"
```

## 2. PostgreSQL Database Setup

### Option A: Local PostgreSQL
1. Install PostgreSQL on your system
2. Create a database:
   ```sql
   CREATE DATABASE your_database_name;
   ```
3. Update the `DATABASE_URL` in your `.env.local` file

### Option B: Cloud Database (Recommended)
1. Sign up for a free PostgreSQL database at [Neon](https://neon.tech/) or [Supabase](https://supabase.com/)
2. Copy the connection string and update `DATABASE_URL` in your `.env.local` file

## 3. Stripe Configuration

1. Sign up at [Stripe](https://stripe.com/)
2. Go to Developers > API Keys
3. Copy your test keys and update:
   - `STRIPE_PUBLISHABLE_KEY` (starts with `pk_test_`)
   - `STRIPE_SECRET_KEY` (starts with `sk_test_`)

4. Set up webhook endpoint:
   - Go to Developers > Webhooks
   - Add endpoint: `https://your-domain.com/api/webhooks/stripe`
   - Select events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
   - Copy the webhook secret and update `STRIPE_WEBHOOK_SECRET`

## 4. Resend Email Setup

1. Sign up at [Resend](https://resend.com/)
2. Go to API Keys and create a new key
3. Copy the key and update `RESEND_API_KEY` in your `.env.local` file
4. Verify your domain in Resend dashboard

## 5. NextAuth Secret

Generate a random secret for NextAuth:
```bash
openssl rand -base64 32
```
Update `NEXTAUTH_SECRET` in your `.env.local` file.

## 6. Database Migration

Run the following command to create the database schema:
```bash
npx prisma db push
```

## 7. Seed Initial Data

Run the seed script to populate initial subscription plans:
```bash
npm run seed
```

## 8. Start Development Server

```bash
npm run dev
```

Your application will be available at `http://localhost:3000`
