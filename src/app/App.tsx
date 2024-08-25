import React, { useEffect } from 'react';
import './App.scss';
import { useLocation, useNavigate } from 'react-router';
import UserProvider from './providers/userProvider/userProvider';
import '@mui/material';
import AppRoutes from './AppRoutes';

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
