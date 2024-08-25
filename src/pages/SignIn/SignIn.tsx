import React, { useContext, useEffect } from 'react';
import {
  signInWithPopup, GoogleAuthProvider,
} from 'firebase/auth';
import { auth } from 'app/firebase/firebase';
import { Button } from '@mui/material';
import './SignIn.scss';
import { useNavigate } from 'react-router';
import { UserContext } from '../../app/providers/userProvider/userProvider';

export default function SignIn() {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const autorizedUser = result.user;

        user.addUser(
          {
            displayName: autorizedUser.displayName,
            email: autorizedUser.email,
            photoURL: autorizedUser.photoURL,
          },
        );
        navigate('/panel/user-info');
      }).catch(() => {
        // TODO add error case
      });
  };

  useEffect(() => {
    if (user.user) navigate('/panel/user-info');
  }, []);

  return (
    <div className="sign-in">
      <Button variant="contained" onClick={handleLogin}>Авторизация</Button>
    </div>
  );
}
