import React from 'react';
import {
  List, ListItemButton, ListItemText, Drawer, Divider,
} from '@mui/material';
import UserPanel from 'feautures/UserPanel/UserPanel';

interface Props {
  drawerWidth: number,
}

function SideBar({ drawerWidth }: Props) {
  return (
    <Drawer
      sx={{
        display: { xs: 'none', sm: 'block' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
      }}
      variant="permanent"
    >
      <UserPanel />
      <Divider />
      <List>
        {['Основная информация', 'Проекты', 'Фотографии', 'Справочники'].map((item) => (
          <ListItemButton key={item}>
            <ListItemText primary={item} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}

export default SideBar;
