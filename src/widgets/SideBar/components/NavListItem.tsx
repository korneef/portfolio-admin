import React from 'react';

import { ListItemButton, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router';

export default function NavListItem({
  item: { displayName, navTo },
}: {
  item: { navTo: string; displayName: string };
}) {
  const navigate = useNavigate();
  const handleClick = () => navigate(`/panel/${navTo}`);

  return (
    <ListItemButton onClick={handleClick}>
      <ListItemText primary={displayName} />
    </ListItemButton>
  );
}
