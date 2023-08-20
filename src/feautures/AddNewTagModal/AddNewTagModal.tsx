import React from 'react';
import {
  Box, Button, Modal, TextField, Typography,
} from '@mui/material';
import { useCreateTagMutation } from '../../app/store/slices/queryApi';

interface Props {
  open: boolean,
  handleClose: () => void,
  newTagValue: string,
  handleChange: (value: string) => void,
}

// TODO refactor this component
// TODO add close button

function AddNewTagModal({
  open, handleClose, newTagValue, handleChange,
}: Props) {
  const [createTag] = useCreateTagMutation();

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

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Добавить новый тэг
        </Typography>
        <Box>
          <Box sx={{
            marginTop: 3,
            marginBottom: 3,
          }}
          >
            <TextField
              fullWidth
              value={newTagValue}
              onChange={(e) => {
                handleChange(e.target.value);
              }}
              label="Наиманование тэга"
            />
          </Box>
          <Button
            variant="contained"
            onClick={() => {
              createTag(newTagValue)
                .then(() => handleClose());
            }}
          >
            Добавить
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default AddNewTagModal;
