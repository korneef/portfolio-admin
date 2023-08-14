import React from 'react';
import {
  List, ListItemButton, ListItemText, Drawer,
} from '@mui/material';

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
