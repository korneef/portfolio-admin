import React, { useContext } from 'react';
import {
  signInWithPopup, signOut, GoogleAuthProvider,
} from 'firebase/auth';
import { auth } from 'app/firebase/firebase';
import { Button } from '@mui/material';
import './SignIn.scss';
import { UserContext } from '../../app/providers/userProvider/userProvider';

export default function SignIn() {
  const user = useContext(UserContext);
  const provider = new GoogleAuthProvider();

  const onClickOnButton = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const autorizedUser = result.user;
        user.addUser(
          // eslint-disable-next-line max-len
          { displayName: autorizedUser.displayName, email: autorizedUser.email, photoURL: autorizedUser.photoURL },
        );
      }).catch((error) => {
        console.log(error);
      });
  };
  const getUser = () => {
    console.log(auth.currentUser);
  };

  return (
    <div className="sign-in">
      <Button variant="contained" onClick={onClickOnButton}>Авторизация</Button>
      <Button variant="contained" onClick={getUser}>getUser</Button>
      <Button
        variant="contained"
        onClick={() => {
          signOut(auth);
          user.deleteUser();
        }}
      >
        singOut
      </Button>
    </div>
  );
}

// TODO refactor this page
