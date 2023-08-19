import React, { useContext } from 'react';
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
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const onClickOnButton = () => {
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
        navigate('/panel/main-info');
      }).catch(() => {
        // TODO add error case
      });
  };

  return (
    <div className="sign-in">
      <Button variant="contained" onClick={onClickOnButton}>Авторизация</Button>
    </div>
  );
}
