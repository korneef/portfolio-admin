import React from 'react';

import { KeyboardArrowRight } from '@mui/icons-material';
import { Button, Drawer } from '@mui/material';

import LocalStorageService from '../../../shared/utils/localStorageService';

export default function SidebarOpenButton({
  setShow,
  showMenu,
}: {
  showMenu: boolean;
  setShow: React.Dispatch<
    React.SetStateAction<{ manually: boolean; auto: boolean }>
  >;
}) {
  const timerRef = React.useRef<null | NodeJS.Timeout>(null);

  const handleOpen = () => {
    setShow((prevState) => ({ ...prevState, manually: true }));
    LocalStorageService.setItem('showSidebar', true);
  };

  const handleMouseEnter = () => {
    timerRef.current = setTimeout(() => {
      setShow((prevState) => ({ ...prevState, auto: true }));
    }, 700);
  };

  const handleClearTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  return (
    <Drawer
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleClearTimer}
      variant="persistent"
      open={!showMenu}
      sx={{
        width: 15,
        '& .MuiDrawer-paper': {
          width: 15,
        },
        transition: 'width 200ms ease',
      }}
    >
      <Button
        sx={{ height: '100%', minWidth: 'unset', padding: '0' }}
        variant="text"
        onClick={handleOpen}
      >
        <KeyboardArrowRight />
      </Button>
    </Drawer>
  );
}
