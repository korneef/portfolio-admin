import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../userProvider/userProvider';

function PrivateRoute() {
  const user = useContext(UserContext);

  return (
    !user?.user ? <Navigate to="/login" /> : <Outlet />
  );
}

export default PrivateRoute;
