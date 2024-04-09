import React from 'react';
import {
  List, ListItemButton, ListItemText, Drawer, Divider,
} from '@mui/material';
import UserPanel from 'feautures/UserPanel/UserPanel';
import { useNavigate } from 'react-router';

interface Props {
  drawerWidth: number,
}

function SideBar({ drawerWidth }: Props) {
  const navigate = useNavigate();

  // TODO refactor this. Extract navItems and create navList component (widget)

  const navItems = [
    { displayName: 'Основная информация', navTo: 'user-info' },
    { displayName: 'Проекты', navTo: 'projects' },
    { displayName: 'Фотографии', navTo: 'photos' },
    { displayName: 'Справочники', navTo: 'dictionaries' },
    { displayName: 'Резюме', navTo: 'cv' },
  ];

  const handleClick = (navTo: string) => navigate(`/panel/${navTo}`);

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
        {navItems.map((item) => (
          <ListItemButton key={item.displayName} onClick={() => handleClick(item.navTo)}>
            <ListItemText primary={item.displayName} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}

export default SideBar;
