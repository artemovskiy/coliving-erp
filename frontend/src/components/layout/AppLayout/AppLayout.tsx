import {
  AppBar, Box, Button, Drawer, IconButton,
  Toolbar, Typography, styled,
} from '@mui/material';
import React, { ReactNode, useCallback, useState } from 'react';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Navigation } from '../Navigation';

export interface AppLayoutProps {
  children?: ReactNode;
  onLogoutClick: () => void
}

const drawerWidth = 240;

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

function AppLayout({ children, onLogoutClick }: AppLayoutProps) {
  const [open, setOpen] = useState(true);
  const logout = useCallback(() => {
    onLogoutClick();
  }, [onLogoutClick]);
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(true)}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit" onClick={logout}>logout</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Navigation />
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column',
        }}
      >
        <Offset />
        { children }
      </Box>
    </Box>
  );
}

export default AppLayout;
