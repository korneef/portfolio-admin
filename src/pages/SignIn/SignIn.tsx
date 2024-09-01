import React, { useContext, useEffect } from 'react';

import { Button } from '@mui/material';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router';

import { auth } from 'app/firebase/firebase';

import { UserContext } from '../../app/providers/userProvider/userProvider';

import './SignIn.scss';

export default function SignIn() {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const autorizedUser = result.user;

        user.addUser({
          displayName: autorizedUser.displayName,
          email: autorizedUser.email,
          photoURL: autorizedUser.photoURL,
        });
        navigate('/panel/user-info');
      })
      .catch(() => {
        // TODO add error case
      });
  };

  useEffect(() => {
    if (user.user) navigate('/panel/user-info');
  }, []);

  return (
    <div className="sign-in">
      <Button variant="contained" onClick={handleLogin}>
        Авторизация
      </Button>
    </div>
  );
}
