#!/bin/bash

# Scoring App - Setup Script
# This script will set up the Laravel application for development or production

echo "========================================="
echo "Scoring App Setup"
echo "========================================="
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "📋 Creating .env file from .env.example..."
    cp .env.example .env
    echo "✅ .env file created"
    echo ""
    echo "⚠️  IMPORTANT: Please update .env with your database credentials!"
    echo ""
else
    echo "✅ .env file already exists"
fi

# Install PHP dependencies
echo "📦 Installing PHP dependencies..."
composer install --no-interaction
echo "✅ Composer dependencies installed"
echo ""

# Install NPM dependencies
echo "📦 Installing NPM dependencies..."
npm install
echo "✅ NPM dependencies installed"
echo ""

# Generate application key if not set
if grep -q "APP_KEY=base64:" .env; then
    echo "✅ Application key already set"
else
    echo "🔑 Generating application key..."
    php artisan key:generate
    echo "✅ Application key generated"
fi
echo ""

# Clear and cache config
echo "⚙️  Clearing config cache..."
php artisan config:clear
echo "✅ Config cache cleared"
echo ""

# Run migrations
echo "🗄️  Running database migrations..."
read -p "Do you want to run migrations? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    php artisan migrate:fresh --seed
    echo "✅ Migrations completed"
else
    echo "⏭️  Skipping migrations"
fi
echo ""

# Build assets
echo "🎨 Building frontend assets..."
npm run dev
echo "✅ Assets built"
echo ""

echo "========================================="
echo "✅ Setup Complete!"
echo "========================================="
echo ""
echo "To start the application:"
echo "1. Start the Laravel server:"
echo "   php artisan serve"
echo ""
echo "2. Start the WebSocket server (in another terminal):"
echo "   php artisan websockets:serve"
echo ""
echo "3. Watch for asset changes (optional, in another terminal):"
echo "   npm run watch"
echo ""
echo "Then visit: http://localhost:8000"
echo ""
