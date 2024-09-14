import React from 'react';

import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import SideBar from 'widgets/SideBar/SideBar';

function LeftMenuLayout() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Box component="nav" aria-label="navigation menu">
        <SideBar />
      </Box>
      <Box margin={2} flexGrow={1}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default LeftMenuLayout;
