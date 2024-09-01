import React, { useEffect } from 'react';

import '@mui/material';
import { useLocation, useNavigate } from 'react-router';

import AppRoutes from './AppRoutes';
import UserProvider from './providers/userProvider/userProvider';

import './App.scss';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') navigate('panel/user-info');
  }, []);
  return (
    <UserProvider>
      <AppRoutes />
    </UserProvider>
  );
}

export default App;
