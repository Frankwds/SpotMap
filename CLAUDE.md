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
- `/src/components/styled/` - Custom-styled MUI components
- `/src/context/` - React context providers (e.g., AuthContext)
- `/src/hooks/` - Custom React hooks (useMarkers, useCategories)
- `/src/pages/` - Page-level components for routing
- `/src/styles/` - Theme configuration and style utilities
- `/src/utils/` - Helper functions and utilities
- `/src/config/` - Application configuration

## Styled Components
- Always import from `components/styled` rather than directly from `@mui/material`.
- Add mui components to `components/styled` if they are not already there.
- Each component maintains theme-based styling with sx props, add any sx inside the component.
- Component folders follow pattern: `ComponentName/ComponentName.tsx`
- Props defined explicitly with minimal interface
- Add props to existing reusable components as needed, keeping them minimal
- Take this as an example of how i want you to import, style and re-export the components:
```
import React from 'react';
import { Select as MuiSelect } from '@mui/material';

interface Props {
  children?: React.ReactNode;
  label?: string;
  labelId?: string;
  native?: boolean;
  onChange?: (event: React.ChangeEvent<{ value: unknown }>, child: React.ReactNode) => void;
  value?: unknown;
  id?: string;
  required?: boolean;
}

export const Select = (props: Props) => {
  return (
    <MuiSelect
      sx={{
        "& .MuiSelect-select": {
          color: theme => theme.palette.text.primary,
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: theme => theme.palette.text.primary,
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: theme => theme.palette.text.primary,
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: theme => theme.palette.success.main,
        }
      }}
      {...props}
    />
  );
};
```

## Naming Conventions
- PascalCase for components, interfaces, and types
- camelCase for variables, functions, and instances
- Descriptive naming (useMarkers, addMarker)
- Prefix custom hooks with 'use'
- Avoid abbreviations in variable names