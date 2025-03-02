# SpotMap Project Guidelines

## Commands
- `npm start` - Start development server
- `npm test` - Run all tests
- `npm test -- -t "test name"` - Run specific test
- `npm run build` - Build for production
- `npm run eject` - Eject from create-react-app

## Code Style
- Use TypeScript with strict null checks
- React functional components with hooks
- Named exports for utilities, default exports for components
- Type definitions in dedicated files (types.tsx)
- Async/await for promises with try/catch blocks
- State management via React hooks (useState, useEffect)
- Custom hooks for reusable logic
- Error handling: catch errors, set error state, display to user
- Follow ESLint rules from react-app config

## Naming Conventions
- PascalCase for components and types
- camelCase for variables, functions, and instances
- Descriptive, semantic naming (e.g., useMarkers, addMarker)
- Suffix custom hooks with 'use' prefix