# Betting Pro Application - Replit.md

## Overview

This is a comprehensive betting money management application built with TypeScript, React, and Express.js. The application provides advanced betting strategies with real-time analytics, featuring multiple algorithmic approaches including Kelly Criterion, D'Alembert, Masaniello, and Profit Fall strategies. The system is designed as a premium SaaS platform with subscription-based access and demo functionality.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing with individual strategy pages
- **UI Components**: Radix UI with Tailwind CSS styling
- **State Management**: React Query (TanStack Query) for server state, React hooks for local state
- **Charts/Visualization**: Chart.js for analytics and sparkline components
- **Build Tool**: Vite for development and production builds
- **Page Structure**: Home page with strategy selection buttons, separate pages for each strategy

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ESM modules
- **Authentication**: Replit Auth integration with session management
- **Session Storage**: PostgreSQL-backed session store
- **Payment Processing**: Stripe integration (demo mode in current setup)
- **Email Service**: SendGrid integration for notifications

### Database Schema
- **ORM**: Drizzle ORM with PostgreSQL
- **Tables**:
  - `users`: User profiles with subscription status
  - `auth_sessions`: Session management for Replit Auth
  - `betting_sessions`: Betting strategy sessions
  - `bets`: Individual bet records

## Key Components

### Betting Strategies
1. **Percentage Strategy**: Fixed percentage of bankroll betting
2. **D'Alembert Strategy**: Progressive betting with unit adjustments
3. **Kelly Criterion**: Probability-based optimal betting size
4. **Masaniello System**: Multi-event structured betting
5. **Profit Fall Strategy**: Custom progressive system
6. **Beat the Delay**: Advanced ML-enhanced strategy

### Authentication System
- Replit Auth integration for secure login
- Session-based authentication with PostgreSQL storage
- Premium subscription verification
- Trial account support

### Payment System
- Stripe integration for subscription management
- Multiple subscription tiers (Basic, Pro, Premium)
- Demo mode for development and testing
- Webhook handling for subscription updates

### Analytics & Visualization
- Real-time session tracking
- Sparkline charts for trend visualization
- Performance metrics and ROI calculations
- Badge system for achievement tracking
- ML-based predictions and recommendations

## Data Flow

1. **User Authentication**: Replit Auth → Session Creation → Database Storage
2. **Betting Session**: Strategy Selection → Parameter Configuration → Session Creation
3. **Bet Placement**: Outcome Recording → Bankroll Updates → Strategy Recalculation
4. **Analytics**: Data Aggregation → Visualization Components → Real-time Updates
5. **Subscription**: Payment Processing → Status Updates → Feature Access Control

## External Dependencies

### Core Dependencies
- **Database**: PostgreSQL with Neon serverless driver
- **Authentication**: Replit Auth OIDC
- **Payments**: Stripe API
- **Email**: SendGrid API
- **UI Components**: Radix UI primitives
- **Styling**: Tailwind CSS

### Development Tools
- **Build**: Vite with TypeScript support
- **Database Migrations**: Drizzle Kit
- **Code Quality**: TypeScript strict mode
- **Container**: Docker with multi-stage builds

## Deployment Strategy

### Container Deployment
- Multi-stage Docker build for optimization  
- Production image with Node.js 18 Alpine
- Non-root user security configuration
- Health checks and graceful shutdown

### Cloud Deployment Options
1. **Google Cloud Run**: Auto-scaling container deployment
2. **Google App Engine**: Managed platform deployment
3. **Replit**: Direct deployment from development environment

### Environment Configuration
- Database URL for PostgreSQL connection
- Stripe keys for payment processing
- SendGrid API key for email services
- Session secret for authentication
- Replit domains for CORS configuration

### CI/CD Pipeline
- Cloud Build configuration for automatic deployments
- Docker image building and pushing to Container Registry
- Automated deployment to Cloud Run with traffic management

## Recent Changes

- July 8, 2025: DEPLOYMENT ISSUES RESOLVED + ZIP PACKAGE CREATED
  - **UPDATED DEPLOYMENT**: Created enhanced production server (server.updated.js) with improved API routes
  - **DOCKER CONFIGURATION**: New dockerfile.updated with multi-stage build for optimal production deployment
  - **RAILWAY/RENDER READY**: Updated configurations for both platforms with proper CORS and health checks
  - **ZIP PACKAGE**: Created money-management-pro-updated-v2.0.zip with all deployment configurations
  - **API ENHANCEMENT**: Full CRUD operations for sessions and bets with proper error handling
  - **HEALTH MONITORING**: Added /health endpoint for deployment monitoring and load balancers

- July 8, 2025: RESTORED ORIGINAL INTERFACE - CONFIRMED WORKING
  - **ORIGINAL VERSION RESTORED**: Successfully found and restored the original professional interface
  - **STRATEGY PAGES**: Individual strategy pages working with proper routing (/strategia/kelly, /strategia/masaniello, etc.)
  - **HOME PAGE**: Original home.tsx with strategy selection buttons that navigate to separate pages
  - **APP ROUTING**: Complete router configuration with all strategy routes and navigation
  - **USER CONFIRMED**: Original interface with strategy buttons opening independent pages now active
  - **DEFAULT CONFIGURATION**: This version is now set as the default configuration
  
- July 8, 2025: DUAL PLATFORM DEPLOYMENT SUCCESS
  - **RAILWAY DEPLOY**: Confirmed working - Server ONLINE, Environment: production, Port: 10000
  - **RENDER DEPLOY**: Also successful - money-management-pro.onrender.com active
  - Created multiple deployment solutions ensuring maximum reliability
  - All core features operational on both platforms: betting strategies, analytics, health checks
  - User now has redundant deployment options for maximum uptime
  - Money Management Pro officially launched and accessible worldwide

## Changelog

- June 24, 2025: Initial setup
- June 25, 2025: Railway deployment fixes and auth corrections

## User Preferences

Preferred communication style: Simple, everyday language.
Deployment preference: Multiple platform options (Railway working, Render as backup)
Success confirmed: Railway deployment functional and operational
Interface preference: Original professional interface with individual strategy pages accessed through navigation buttons
Default configuration: Home page with strategy selection buttons that open separate dedicated pages for each betting strategyBACKUP CREATED: Tue Jul  8 09:08:45 AM UTC 2025
