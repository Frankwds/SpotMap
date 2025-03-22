/**
 * API interceptors for authentication
 */

import { refreshToken } from './authApi';

/**
 * Add authorization header to fetch requests
 */
export const authFetch = async (
  input: RequestInfo,
  init?: RequestInit
): Promise<Response> => {
  // Try to get the token from localStorage
  const token = localStorage.getItem('accessToken');
  const tokenExpiry = localStorage.getItem('tokenExpiry');

  // If token exists, check if it's expired
  if (token && tokenExpiry) {
    const expiryTime = parseInt(tokenExpiry, 10);
    const currentTime = Date.now();

    // If token is expired, try to refresh it
    if (currentTime >= expiryTime) {
      const refreshTokenValue = localStorage.getItem('refreshToken');

      if (refreshTokenValue) {
        try {
          const authResponse = await refreshToken(refreshTokenValue);

          // Save the new tokens
          localStorage.setItem('accessToken', authResponse.accessToken);
          localStorage.setItem('refreshToken', authResponse.refreshToken);
          localStorage.setItem('tokenExpiry', String(Date.now() + authResponse.expiresIn * 1000));

          // Set the Authorization header with the new token
          return fetch(input, {
            ...init,
            headers: {
              ...init?.headers,
              Authorization: `Bearer ${authResponse.accessToken}`
            }
          });
        } catch {
          // If refresh fails, clear tokens and continue without auth
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('tokenExpiry');
        }
      }
    } else {
      // Token is still valid, add it to the request
      return fetch(input, {
        ...init,
        headers: {
          ...init?.headers,
          Authorization: `Bearer ${token}`
        }
      });
    }
  }

  // No token or refresh failed, proceed without auth header
  return fetch(input, init);
};
