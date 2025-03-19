import React, { useEffect, useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useAuth } from '../../context/AuthContext';

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const REDIRECT_URI = window.location.origin;

const GoogleLoginButton: React.FC = () => {
  const { handleGoogleLogin, loading } = useAuth();
  const [localLoading, setLocalLoading] = useState(false);

  useEffect(() => {
    // Parse the URL for the authorization code on component mount
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    
    if (code) {
      setLocalLoading(true);
      handleGoogleLogin(code)
        .finally(() => {
          setLocalLoading(false);
          // Clean up the URL by removing the code parameter
          const cleanUrl = window.location.pathname;
          window.history.replaceState({}, document.title, cleanUrl);
        });
    }
  }, [handleGoogleLogin]);

  const handleLogin = () => {
    // Construct the Google OAuth URL
    const scope = encodeURIComponent('openid email profile');
    const responseType = 'code';
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${responseType}&scope=${scope}&access_type=offline&prompt=consent`;
    
    // Redirect to Google's authorization page
    window.location.href = authUrl;
  };

  if (!GOOGLE_CLIENT_ID) {
    console.error('Google Client ID is not set in environment variables');
    return null;
  }

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleLogin}
      disabled={loading || localLoading}
      startIcon={loading || localLoading ? <CircularProgress size={20} color="inherit" /> : <GoogleIcon />}
      sx={{ textTransform: 'none' }}
    >
      {loading || localLoading ? 'Signing in...' : 'Sign in with Google'}
    </Button>
  );
};

export default GoogleLoginButton;