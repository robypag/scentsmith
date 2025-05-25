# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SmellSmith is a NextJS 15 application for perfume analysis and fragrance discovery, built with modern web technologies and AI integration.

## Technology Stack

- **Framework**: NextJS 15 with App Router and TypeScript
- **Styling**: Tailwind CSS with ShadCN UI components  
- **Database**: PostgreSQL with Drizzle ORM and pgvector for vector embeddings
- **Authentication**: NextAuth.js with credentials provider
- **AI Integration**: Vercel AI SDK v4 for LLM interactions
- **UI Components**: ShadCN components with Lucide React icons

## Development Commands

```bash
# Development server with Turbopack
npm run dev

# Build for production  
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Database operations
npx drizzle-kit generate    # Generate migrations
npx drizzle-kit migrate     # Run migrations
npx drizzle-kit studio      # Database studio
```

## Architecture

### Layout System
- **App Layout**: `/src/components/layout/app-layout.tsx` - Main layout wrapper with SidebarProvider
- **Left Sidebar**: `/src/components/layout/app-sidebar.tsx` - Main navigation with collapsible functionality
- **Right Sidebar**: `/src/components/layout/right-sidebar.tsx` - Analysis panel and quick actions
- **Mobile Navigation**: `/src/components/layout/mobile-nav.tsx` - Sheet-based mobile menu
- **Navbar**: `/src/components/layout/navbar.tsx` - Top navigation with user controls

### Database Schema
- **Users**: Basic user information with UUID primary keys
- **Fragrances**: Perfume data with vector embeddings for similarity search
- **Collections**: User-organized fragrance groups
- **UserFragrances**: Join table for user's personal fragrance collection with ratings/notes

### Authentication Flow
- NextAuth configured with credentials provider
- Demo credentials: `demo@smellsmith.com` / `demo123`
- Session management via JWT strategy
- Sign-in page at `/auth/signin`

### Mock Data
- Fragrance data stored in `/src/lib/mock-data/fragrances.ts`
- Well-encapsulated mock data - never embed directly in components
- Use mock data for development until database is fully configured

## Development Guidelines

### Component Structure
- Prefer Server Side Rendering (SSR) components when possible
- Use "use client" directive only when necessary for interactivity
- Follow existing ShadCN component patterns and styling conventions
- All new UI components should use ShadCN base components

### Database Operations  
- Use Drizzle ORM for all database interactions
- Vector embeddings stored as 1536-dimension vectors for AI similarity search
- Always use TypeScript types generated from schema

### Code Organization
- Components in `/src/components/` with logical subdirectories
- Database code in `/src/lib/db/`
- Mock data in `/src/lib/mock-data/`
- API routes in `/src/app/api/`
- Page components in `/src/app/` following App Router structure

### Environment Variables
- Copy `.env.example` to `.env.local` for local development
- Required: DATABASE_URL, NEXTAUTH_URL, NEXTAUTH_SECRET
- Optional: OPENAI_API_KEY, ANTHROPIC_API_KEY for AI features