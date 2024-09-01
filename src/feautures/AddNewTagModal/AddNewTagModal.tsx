import React, { useState } from 'react';

import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';

import { useCreateTagMutation } from '../../app/store/slices/queryApi';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  borderRadius: '5px',
  boxShadow: 24,
  p: 4,
};

interface Props {
  open: boolean;
  handleClose: () => void;
}

function AddNewTagModal({ open, handleClose }: Props) {
  const [createTag, { isLoading }] = useCreateTagMutation();
  const [newTagName, setNewTagName] = useState('');

  const handleAddTag = async () => {
    await createTag(newTagName);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Добавить новый тэг
        </Typography>
        <Box>
          <Box
            sx={{
              marginTop: 3,
              marginBottom: 3,
            }}
          >
            <TextField
              fullWidth
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              label="Наиманование тэга"
            />
          </Box>
          <Box
            sx={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}
          >
            <Button
              onClick={handleClose}
              variant="outlined"
              disabled={isLoading}
            >
              Отмена
            </Button>

            <LoadingButton
              variant="contained"
              onClick={handleAddTag}
              loading={isLoading}
            >
              Добавить
            </LoadingButton>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

export default AddNewTagModal;
