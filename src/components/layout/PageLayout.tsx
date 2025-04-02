import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  AppBar, 
  Toolbar, 
  IconButton, 
  Typography 
} from '../styled';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import UserMenu from '../auth/UserMenu';
import {useTheme } from '@mui/material';

interface PageLayoutProps {
  children: ReactNode;
  title: string;
  sidebarOpen: boolean;
  sidebarWidth: number;
  onSidebarToggle: () => void;
  showBackButton?: boolean;
  backTo?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title,
  sidebarOpen,
  sidebarWidth,
  onSidebarToggle,
  showBackButton = false,
  backTo = '/'
}) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleBackClick = () => {
    navigate(backTo);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Main Content */}
      <Box sx={{ flexGrow: 1 }}>
        {/* App Bar */}
        <AppBar
          position="fixed"
          sx={{
            width: sidebarOpen ? `calc(100% - ${sidebarWidth}px)` : '100%',
            ml: sidebarOpen ? `${sidebarWidth}px` : 0,
            zIndex: (theme) => theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={onSidebarToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            
            {showBackButton && (
              <IconButton 
                color="inherit" 
                edge="start" 
                onClick={handleBackClick}
                sx={{ mr: 2 }}
              >
                <ArrowBackIcon />
              </IconButton>
            )}
            

            <Typography variant="h6" >
              {title}
            </Typography>
            
            <Box sx={{ flexGrow: 1 }} />
            <Box> 
              <UserMenu/>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Page Content */}
        <Box

        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default PageLayout;