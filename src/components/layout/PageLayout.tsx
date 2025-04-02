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
import UserMenu from '../auth/UserMenu';
import { useTheme } from '@mui/material';

interface PageLayoutProps {
  children: ReactNode;
  sidebarOpen: boolean;
  sidebarWidth: number;
  onSidebarToggle: () => void;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  sidebarOpen,
  sidebarWidth,
  onSidebarToggle,
}) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleTitleClick = () => {
    navigate('/');
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
            
            <Typography 
              variant="h6" 
              onClick={handleTitleClick}
              sx={{ 
                cursor: 'pointer',
                '&:hover': {
                  opacity: 0.8
                }
              }}
            >
              SpotMap
            </Typography>
            
            <Box sx={{ flexGrow: 1 }} />
            <Box> 
              <UserMenu/>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Page Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: sidebarOpen ? `calc(100% - ${sidebarWidth}px)` : '100%',
            ml: sidebarOpen ? `${sidebarWidth}px` : 0,
            transition: theme.transitions.create(['width', 'margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
            mt: 8, // To account for AppBar
            height: 'calc(100vh - 64px)', // Full height minus AppBar
            overflow: 'auto',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default PageLayout;