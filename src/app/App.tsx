import React, { useEffect } from 'react';
import './App.scss';
import {
  Route, Routes, useLocation, useNavigate,
} from 'react-router';
import SignIn from '../pages/SignIn/SignIn';
import UserProvider from './providers/userProvider/userProvider';
import PrivateRoute from './providers/privateRouteProvider/PrivateRoute';
import LeftMenuLayout from '../layouts/LeftMenuLayout/LeftMenuLayout';
import PhotosPage from '../pages/Photos/PhotosPage';
import UserInfoPage from '../pages/UserInfo/UserInfoPage';
import ProjectsPage from '../pages/ProjectsPage/ProjectsPage';
import '@mui/material';
import ProjectPage from '../pages/ProjectPage/ProjectPage';
import Dictionaries from '../pages/Dictionaries/Dictionaries';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    // todo refactor navigation
    if (location.pathname === '/') navigate('panel/user-info');
  });
  return (
    <UserProvider>
      <div className="App">
        <Routes>
          {/* private */}
          <Route path="/" element={<PrivateRoute />}>
            <Route path="panel" element={<LeftMenuLayout />}>
              <Route index path="user-info" element={<UserInfoPage />} />
              <Route path="photos" element={<PhotosPage />} />
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="projects/:id" element={<ProjectPage />} />
              <Route path="dictionaries" element={<Dictionaries />} />
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
