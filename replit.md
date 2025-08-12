# Overview

This is a full-stack web application built with React and Express that provides an AI-powered communication assistant. The application allows users to interact with a specialized chatbot that focuses exclusively on communication topics, using Google's Gemini AI. The frontend is built with React, TypeScript, and shadcn/ui components, while the backend uses Express with TypeScript. The application is designed to be educational, helping users learn about various aspects of communication through interactive conversations.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for development and building
- **UI Library**: shadcn/ui components built on Radix UI primitives with Tailwind CSS for styling
- **State Management**: React Query (@tanstack/react-query) for server state management and local React state for UI
- **Routing**: Wouter for client-side routing (lightweight React router alternative)
- **Form Handling**: React Hook Form with Zod validation schemas
- **Styling**: Tailwind CSS with CSS custom properties for theming and responsive design

## Backend Architecture
- **Framework**: Express.js with TypeScript running on Node.js
- **API Design**: RESTful endpoints with `/api` prefix
- **Request Validation**: Zod schemas for runtime type checking and validation
- **Error Handling**: Centralized error handling middleware with structured error responses
- **Development Setup**: Vite integration for development with hot reload and runtime error overlays

## Data Storage
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Connection**: Neon Database serverless PostgreSQL connection
- **Fallback Storage**: In-memory storage implementation for development/testing scenarios

## Authentication & Session Management
- **Session Storage**: PostgreSQL-based session storage using connect-pg-simple
- **User Schema**: Basic user management with username/password authentication
- **Database Tables**: Users and messages tables with UUID primary keys

## AI Integration
- **Provider**: Google Gemini AI (Generative AI) for natural language processing
- **API Integration**: Direct REST API calls to Google's Generative Language API
- **Content Filtering**: Specialized prompts to ensure responses focus only on communication topics
- **Error Handling**: Graceful degradation with user-friendly error messages for AI service failures

## External Dependencies

- **Google Gemini AI**: Primary AI service for generating communication-focused responses via REST API
- **Neon Database**: Serverless PostgreSQL database hosting
- **Radix UI**: Headless UI component primitives for accessibility and functionality
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Drizzle ORM**: Type-safe ORM for PostgreSQL database operations
- **React Query**: Server state management and caching library
- **Vite**: Development server and build tool with hot module replacement