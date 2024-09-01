import React from 'react';

import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import SideBar from 'widgets/SideBar/SideBar';

function LeftMenuLayout() {
  const drawerWidth = 300;

  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="navigation menu"
      >
        <SideBar drawerWidth={drawerWidth} />
      </Box>
      <Box width="100%" margin={2}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default LeftMenuLayout;
