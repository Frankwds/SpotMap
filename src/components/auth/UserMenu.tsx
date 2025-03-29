import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Button,
  MenuItem,
  Typography,
  IconButton,
  Avatar,
  Divider,
  Menu
} from "../../components/styled";
import { useAuth } from '../../context/AuthContext';
import GoogleLoginButton from './GoogleLoginButton';

const UserMenu: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

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

  const handleNavigateToProfile = () => {
    handleClose();
    // Navigate to profile page when implemented
    // navigate('/profile');
  };

  const handleNavigateToMySpots = () => {
    handleClose();
    navigate('/my-spots');
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
          <Typography variant="body2" >
            {user?.email}
          </Typography>
        </Box>
        <Divider />
        <MenuItem onClick={handleNavigateToProfile}>My Profile</MenuItem>
        <MenuItem onClick={handleNavigateToMySpots}>My Spots</MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <Button 
            color="secondary" 
          >
            Logout
          </Button>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserMenu;