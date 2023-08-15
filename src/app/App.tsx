import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router';
import SignIn from '../pages/SignIn/SignIn';
import UserProvider from './providers/userProvider/userProvider';
import PrivateRoute from './providers/privateRouteProvider/PrivateRoute';
import LeftMenuLayout from '../layouts/LeftMenuLayout/LeftMenuLayout';
import PhotosPage from '../pages/Photos/PhotosPage';
import MainInfoPage from '../pages/MainInfo/MainInfoPage';
import ProjectsPage from '../pages/Projects/ProjectsPage';
import ReferencePage from '../pages/Reference/ReferencePage';
import '@mui/material';

function App() {
  return (
    <UserProvider>
      <div className="App">
        <Routes>
          {/* private */}
          <Route path="/" element={<PrivateRoute />}>
            <Route path="panel" element={<LeftMenuLayout />}>
              <Route path="main-info" element={<MainInfoPage />} />
              <Route path="photos" element={<PhotosPage />} />
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="reference" element={<ReferencePage />} />
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
