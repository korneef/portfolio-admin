import React from 'react';

import { Box, CircularProgress } from '@mui/material';

function PageLoader() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
      }}
    >
      <CircularProgress />
    </Box>
  );
}

export default PageLoader;
