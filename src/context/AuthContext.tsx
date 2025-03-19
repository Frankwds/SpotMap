import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { exchangeGoogleToken, logout, AuthResponse } from '../api/authApi';

interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  handleGoogleLogin: (code: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check for existing tokens on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const tokenExpiry = localStorage.getItem('tokenExpiry');
        
        if (token && tokenExpiry) {
          // If token exists but is expired, handle logout
          if (Date.now() >= parseInt(tokenExpiry, 10)) {
            await handleLogout();
            return;
          }
          
          // Try to decode user info from token or get from localStorage
          const userJson = localStorage.getItem('user');
          if (userJson) {
            setUser(JSON.parse(userJson));
          }
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
        await handleLogout();
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  const handleGoogleLogin = async (code: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      // Exchange code for tokens
      const authResponse: AuthResponse = await exchangeGoogleToken(code);
      
      // Save tokens and user info
      localStorage.setItem('accessToken', authResponse.accessToken);
      localStorage.setItem('refreshToken', authResponse.refreshToken);
      localStorage.setItem('tokenExpiry', String(Date.now() + authResponse.expiresIn * 1000));
      localStorage.setItem('user', JSON.stringify(authResponse.user));
      
      setUser(authResponse.user);
    } catch (err) {
      console.error('Google login error:', err);
      setError('Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async (): Promise<void> => {
    try {
      setLoading(true);
      await logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setUser(null);
      localStorage.removeItem('user');
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        isAuthenticated: !!user,
        handleGoogleLogin,
        logout: handleLogout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};