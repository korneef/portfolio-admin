import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router';
import SignIn from '../pages/SignIn/SignIn';
import UserProvider from './providers/userProvider/userProvider';
import TestPage from '../pages/TestPage';
import PrivateRoute from './providers/privateRouteProvider/PrivateRoute';
import LeftMenuLayout from '../layouts/LeftMenuLayout/LeftMenuLayout';
import '@mui/material';

function App() {
  return (
    <UserProvider>
      <div className="App">
        <Routes>
          {/* private */}
          <Route path="/" element={<PrivateRoute />}>
            <Route path="panel" element={<LeftMenuLayout />}>
              <Route path="home" element={<TestPage />} />
            </Route>
          </Route>
          {/* public */}
          <Route path="/login" element={<SignIn />} />
          <Route path="/*" element={<div>not found</div>} />
        </Routes>
      </div>
    </UserProvider>
  );
}

export default App;
