<!-- Workspace-specific Copilot instructions -->

# Healthcare Data System - Copilot Instructions

## Project Overview
Complete healthcare data integration system built with Next.js, TypeScript, and React. Implements a full data pipeline: Fetch → Process → Analyze → Submit.

## Architecture
- **Frontend**: React 19 with Next.js 16 App Router
- **Backend**: Next.js API Routes
- **Styling**: Tailwind CSS 4
- **Type Safety**: TypeScript throughout

## Key Files
- \`app/page.tsx\`: Main UI with pipeline orchestration
- \`app/api/*\`: API routes for fetch, process, submit
- \`lib/*\`: Business logic services
- \`components/*\`: Reusable React components

## Code Style
- Use TypeScript interfaces for all data structures
- Implement proper error handling with try/catch
- Add JSDoc comments for functions
- Follow React hooks best practices
- Use async/await for asynchronous operations

## When Adding Features
1. Define types in \`lib/types.ts\`
2. Create service logic in \`lib/\`
3. Add API route if needed in \`app/api/\`
4. Create React component in \`components/\`
5. Update main page to integrate feature

## Project Setup Complete ✅

All components implemented and documented.

### To Run:
\`\`\`bash
npm run dev
\`\`\`

Visit http://localhost:3000
