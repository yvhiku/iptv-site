#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Starting project setup...\n');

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env.local file...');
  
  const envContent = `# Database
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
FROM_EMAIL="noreply@yourdomain.com"`;

  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env.local file created');
  console.log('⚠️  Please update the environment variables in .env.local with your actual values\n');
} else {
  console.log('✅ .env.local file already exists\n');
}

// Install dependencies
console.log('📦 Installing dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Dependencies installed\n');
} catch (error) {
  console.error('❌ Error installing dependencies:', error.message);
  process.exit(1);
}

// Check if DATABASE_URL is configured
const envContent = fs.readFileSync(envPath, 'utf8');
if (envContent.includes('your_database_name')) {
  console.log('⚠️  Please configure your DATABASE_URL in .env.local before running database commands\n');
  console.log('📋 Next steps:');
  console.log('1. Set up a PostgreSQL database');
  console.log('2. Update DATABASE_URL in .env.local');
  console.log('3. Run: npx prisma db push');
  console.log('4. Run: npm run seed');
  console.log('5. Run: npm run dev');
} else {
  console.log('🗄️  Setting up database...');
  try {
    execSync('npx prisma db push', { stdio: 'inherit' });
    console.log('✅ Database schema created');
    
    console.log('🌱 Seeding database...');
    execSync('npm run seed', { stdio: 'inherit' });
    console.log('✅ Database seeded with initial data');
    
    console.log('\n🎉 Setup complete! You can now run: npm run dev');
  } catch (error) {
    console.error('❌ Error setting up database:', error.message);
    console.log('\n📋 Manual steps:');
    console.log('1. Make sure your DATABASE_URL is correct in .env.local');
    console.log('2. Run: npx prisma db push');
    console.log('3. Run: npm run seed');
    console.log('4. Run: npm run dev');
  }
}
