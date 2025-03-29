# SpotMap

A React application for mapping, discovering and sharing outdoor activity spots.

## Authentication

This application uses Google OAuth 2.0 for authentication. You'll need to:

1. Set up a Google OAuth 2.0 client in Google Cloud Console
2. Add appropriate redirect URIs (local development and production)
3. Configure environment variables:
   - Create a `.env` file based on `.env.example`
   - Add your Google OAuth Client ID to `REACT_APP_GOOGLE_CLIENT_ID`

## Backend Implementation

The frontend expects a .NET backend API with the following authentication endpoints:

- `POST /api/auth/google` - Accepts Google authorization code, validates with Google, creates/updates user, returns JWT
- `POST /api/auth/refresh` - Refreshes the access token
- `POST /api/auth/logout` - Logs out the user and invalidates tokens

For marker functionality, the backend needs:

- `GET /markers` - Get all markers
- `GET /markers/{id}` - Get a specific marker
- `POST /markers` - Create a new marker
- `DELETE /markers/{id}` - Delete a marker

All endpoints should use JWT Bearer authentication.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Launches the test runner in the interactive watch mode.

### `yarn build`

Builds the app for production to the `build` folder.
