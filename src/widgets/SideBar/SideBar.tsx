import React, { useEffect } from 'react';

import { KeyboardDoubleArrowLeft } from '@mui/icons-material';
import { Button, Divider, Drawer, List } from '@mui/material';

import UserPanel from 'features/UserPanel/UserPanel';

import LocalStorageService from '../../shared/utils/localStorageService';

import NavListItem from './components/NavListItem';
import SidebarOpenButton from './components/SidebarOpenButton';
import navItems from './constants';

function SideBar() {
  const [show, setShow] = React.useState({ manually: false, auto: false });
  const showMenu = show.auto || show.manually;

  const handleMouseLeave = () =>
    setShow((prevState) => ({ ...prevState, auto: false }));

  const handleClose = () => {
    setShow({ manually: false, auto: false });
    LocalStorageService.setItem('showSidebar', false);
  };

  useEffect(() => {
    const showSidebar = LocalStorageService.getItem('showSidebar');
    setShow({ manually: Boolean(showSidebar), auto: false });
  }, []);

  return (
    <>
      <SidebarOpenButton showMenu={showMenu} setShow={setShow} />

      <Drawer
        variant="persistent"
        open={showMenu}
        sx={{
          width: show.manually ? 300 : 0,
          '& .MuiDrawer-paper': {
            width: 300,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          },
          transition: 'width 200ms ease',
        }}
        onMouseLeave={handleMouseLeave}
      >
        <Button variant="text" onClick={handleClose}>
          <KeyboardDoubleArrowLeft />
        </Button>

        <Divider />

        <List sx={{ flexGrow: 1 }}>
          {navItems.map((item) => (
            <NavListItem key={item.displayName} item={item} />
          ))}
        </List>

        <Divider />

        <UserPanel />
      </Drawer>
    </>
  );
}

export default SideBar;
