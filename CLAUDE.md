# SpotMap Project Guidelines

## Commands
- `npm start` - Start development server
- `npm test` - Run all tests
- `npm test -- -t "test name"` - Run specific test by name pattern
- `npm run build` - Build for production
- `npm run lint` - Run ESLint on all TypeScript/JavaScript files

## Code Style
- TypeScript with strict null checks (strictNullChecks: true)
- React functional components with hooks (React 19)
- ESModule imports with named exports for utilities
- Type definitions in dedicated files (*.types.ts)
- Async/await with try/catch blocks for error handling
- Material UI (MUI v7) for component styling
- React Router (v7) for client-side routing
- Follow ESLint config rules with unused-imports plugin

## Project Architecture
- `/src/api/` - API client services and types
- `/src/components/` - Reusable UI components organized by feature
- `/src/context/` - React context providers (e.g., AuthContext)
- `/src/hooks/` - Custom React hooks (useMarkers, useCategories)
- `/src/pages/` - Page-level components for routing
- `/src/styles/` - Theme configuration and style utilities
- `/src/utils/` - Helper functions and utilities
- `/src/config/` - Application configuration

## Naming Conventions
- PascalCase for components, interfaces, and types
- camelCase for variables, functions, and instances
- Descriptive naming (useMarkers, addMarker)
- Prefix custom hooks with 'use'
- Avoid abbreviations in variable names