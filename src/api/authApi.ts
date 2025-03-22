/**
 * Authentication API service
 */
import { API_CONFIG } from '../config/appConfig';

const AUTH_BASE_URL = `${API_CONFIG.BASE_URL}${API_CONFIG.AUTH_PATH}`;

/**
 * Exchange Google OAuth code for JWT tokens
 */
export const exchangeGoogleToken = async (authCode: string): Promise<AuthResponse> => {
  const response = await fetch(`${AUTH_BASE_URL}/google`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ authCode })
  });

  if (!response.ok) {
    throw new Error('Failed to authenticate with Google');
  }

  return await response.json();
};

/**
 * Refresh the access token using a refresh token
 */
export const refreshToken = async (refreshToken: string): Promise<AuthResponse> => {
  const response = await fetch(`${AUTH_BASE_URL}/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ refreshToken })
  });

  if (!response.ok) {
    throw new Error('Failed to refresh token');
  }

  return await response.json();
};

/**
 * Logout the user (revoke tokens on the server)
 */
export const logout = async (): Promise<void> => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  if (!accessToken || !refreshToken) return;

  await fetch(`${AUTH_BASE_URL}/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify({ AccessToken: accessToken, RefreshToken: refreshToken })
  });

  // Clear local storage regardless of response
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('tokenExpiry');
};

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: {
    id: string;
    email: string;
    name: string;
    picture?: string;
  };
}