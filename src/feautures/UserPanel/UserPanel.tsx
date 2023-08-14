import React, { useContext } from 'react';
import {
  Box, Avatar, Typography, IconButton,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from 'firebase/auth';
import { UserContext } from '../../app/providers/userProvider/userProvider';
import { auth } from '../../app/firebase/firebase';

function UserPanel() {
  const { user, deleteUser } = useContext(UserContext);
  const photoURL = user?.photoURL === null || user === null ? undefined : user.photoURL;

  return (
    <Box
      padding={2.5}
      display="flex"
      justifyContent="space-around"
      alignItems="center"
      maxWidth="270px"
    >
      <Avatar src={photoURL} />
      <Typography margin={1}>{ user?.displayName }</Typography>
      <IconButton onClick={() => {
        signOut(auth).then(() => deleteUser());
      }}
      >
        <LogoutIcon />
      </IconButton>
    </Box>
  );
}

export default UserPanel;
