import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Divider
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import GoogleLoginButton from './GoogleLoginButton';

const UserMenu: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleClose();
    await logout();
  };

  if (!isAuthenticated) {
    return <GoogleLoginButton />;
  }

  return (
    <Box>
      <IconButton
        onClick={handleClick}
        size="small"
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <Avatar 
          src={user?.picture} 
          alt={user?.name || 'User'}
          sx={{ width: 32, height: 32 }}
        >
          {user?.name?.charAt(0).toUpperCase() || 'U'}
        </Avatar>
      </IconButton>
      <Menu
        id="account-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="subtitle1">{user?.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {user?.email}
          </Typography>
        </Box>
        <Divider />
        <MenuItem onClick={handleClose}>My Profile</MenuItem>
        <MenuItem onClick={handleClose}>My Spots</MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <Button 
            color="error" 
            fullWidth 
            variant="outlined" 
            size="small"
          >
            Logout
          </Button>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserMenu;