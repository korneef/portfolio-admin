import { Route, Routes } from 'react-router';
import React from 'react';
import PrivateRoute from './providers/privateRouteProvider/PrivateRoute';
import LeftMenuLayout from '../layouts/LeftMenuLayout/LeftMenuLayout';
import UserInfoPage from '../pages/UserInfo/UserInfoPage';
import CVPage from '../pages/CVPage/CVPage';
import PhotosPage from '../pages/Photos/PhotosPage';
import ProjectsPage from '../pages/ProjectsPage/ProjectsPage';
import ProjectPage from '../pages/ProjectPage/ProjectPage';
import Dictionaries from '../pages/Dictionaries/Dictionaries';
import SignIn from '../pages/SignIn/SignIn';

function AppRoutes() {
  return (
    <Routes>
      {/* private routes */ }
      <Route path="/" element={<PrivateRoute />}>
        <Route path="panel" element={<LeftMenuLayout />}>
          <Route index path="user-info" element={<UserInfoPage />} />
          <Route path="cv" element={<CVPage />} />
          <Route path="photos" element={<PhotosPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/:id" element={<ProjectPage />} />
          <Route path="dictionaries" element={<Dictionaries />} />
        </Route>
      </Route>

      {/* public routes */ }
      <Route path="/login" element={<SignIn />} />
      <Route path="/*" element={<div>not found</div>} />
    </Routes>
  );
}

export default AppRoutes;
