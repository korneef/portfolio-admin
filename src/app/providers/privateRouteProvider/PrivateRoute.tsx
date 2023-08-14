import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../userProvider/userProvider';

function PrivateRoute() {
  console.log('render privateRoute');
  const user = useContext(UserContext);

  // console.log(user);
  return (
    !user?.user ? <Navigate to="/login" /> : <Outlet />
  );
}

export default PrivateRoute;
