import React, { useContext } from 'react';

import LogoutIcon from '@mui/icons-material/Logout';
import { Box, Avatar, Typography, IconButton } from '@mui/material';
import { signOut } from 'firebase/auth';

import { auth } from '../../app/firebase/firebase';
import { UserContext } from '../../app/providers/userProvider/userProvider';

function UserPanel() {
  const { user, deleteUser } = useContext(UserContext);

  const photoURL =
    user?.photoURL === null || user === null ? undefined : user.photoURL;

  return (
    <Box
      padding={2.5}
      display="flex"
      justifyContent="space-around"
      alignItems="center"
      maxWidth="270px"
    >
      <Avatar src={photoURL} />
      <Typography margin={1}>{user?.displayName}</Typography>
      <IconButton
        onClick={() => {
          signOut(auth).then(() => deleteUser());
        }}
      >
        <LogoutIcon />
      </IconButton>
    </Box>
  );
}

export default UserPanel;
