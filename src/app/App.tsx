import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router';
import SignIn from '../pages/SignIn/SignIn';
import UserProvider from './providers/userProvider/userProvider';
import PrivateRoute from './providers/privateRouteProvider/PrivateRoute';
import LeftMenuLayout from '../layouts/LeftMenuLayout/LeftMenuLayout';
import PhotosPage from '../pages/Photos/PhotosPage';
import UserInfoPage from '../pages/UserInfo/UserInfoPage';
import ProjectsPage from '../pages/ProjectsPage/ProjectsPage';
import ReferencePage from '../pages/Reference/ReferencePage';
import '@mui/material';
import ProjectPage from '../pages/ProjectPage/ProjectPage';

function App() {
  return (
    <UserProvider>
      <div className="App">
        <Routes>
          {/* private */}
          <Route path="/" element={<PrivateRoute />}>
            <Route path="panel" element={<LeftMenuLayout />}>
              <Route path="main-info" element={<UserInfoPage />} />
              <Route path="photos" element={<PhotosPage />} />
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="projects/:id" element={<ProjectPage />} />
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
