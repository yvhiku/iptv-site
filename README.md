# IPTV Subscription Service

A modern Next.js application for managing IPTV subscriptions with Stripe payments, user authentication, and admin dashboard.

## Features

- 🔐 User authentication with NextAuth.js
- 💳 Stripe payment integration
- 📧 Email notifications with Resend
- 🎯 Admin dashboard for managing subscriptions
- 📱 Responsive design with Tailwind CSS
- 🗄️ PostgreSQL database with Prisma ORM

## Quick Start

### Option 1: Automated Setup
```bash
npm run setup
```

### Option 2: Manual Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   Create a `.env.local` file with the following variables:
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

3. **Set up PostgreSQL database**
   - Install PostgreSQL locally or use a cloud service (Neon, Supabase)
   - Create a database and update the `DATABASE_URL`

4. **Configure Stripe**
   - Sign up at [Stripe](https://stripe.com/)
   - Get your API keys from the dashboard
   - Set up webhook endpoint: `https://your-domain.com/api/webhooks/stripe`

5. **Configure Resend**
   - Sign up at [Resend](https://resend.com/)
   - Get your API key from the dashboard
   - Verify your domain

6. **Generate NextAuth secret**
   ```bash
   openssl rand -base64 32
   ```

7. **Set up database**
   ```bash
   npx prisma db push
   npm run seed
   ```

8. **Start development server**
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run seed` - Seed database with initial data
- `npm run setup` - Automated setup script

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── admin/             # Admin dashboard pages
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   └── dashboard/         # User dashboard pages
├── components/            # React components
│   ├── admin/            # Admin-specific components
│   ├── auth/             # Authentication components
│   ├── dashboard/        # Dashboard components
│   ├── home/             # Homepage components
│   ├── layout/           # Layout components
│   ├── pricing/          # Pricing components
│   └── ui/               # Reusable UI components
├── lib/                  # Utility libraries
├── prisma/               # Database schema and migrations
└── scripts/              # Setup and utility scripts
```

## Database Schema

The application uses the following main models:
- `User` - User accounts and authentication
- `SubscriptionPlan` - Available subscription plans
- `UserSubscription` - User subscription records
- `Order` - Payment orders
- `ServiceCredentials` - IPTV service credentials

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `NEXTAUTH_URL` | Application URL | Yes |
| `NEXTAUTH_SECRET` | NextAuth.js secret key | Yes |
| `STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | Yes |
| `STRIPE_SECRET_KEY` | Stripe secret key | Yes |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret | Yes |
| `RESEND_API_KEY` | Resend API key | Yes |
| `FROM_EMAIL` | Sender email address | Yes |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
