import React, { ChangeEvent, useState } from 'react';
import { Box, IconButton, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import CancelIcon from '@mui/icons-material/Cancel';

interface Props {
  value: string;
  placeholder: string;
}

function MultiLineInput({ value, placeholder }: Props) {
  const [isEdit, setIsEdit] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const editButon = (
    <IconButton onClick={handleEdit}>
      <EditIcon />
    </IconButton>
  );

  const saveAndDeleteButtons = (
    <>
      <IconButton onClick={handleEdit}>
        <DoneIcon />
      </IconButton>
      <IconButton onClick={handleEdit}>
        <CancelIcon />
      </IconButton>
    </>
  );

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: 2,
      }}
    >
      <TextField
        sx={{ flexGrow: 1 }}
        multiline
        placeholder={placeholder}
        label={placeholder}
        value={inputValue}
        disabled={!isEdit}
        onChange={handleChange}
      />
      {isEdit ? saveAndDeleteButtons : editButon}
    </Box>
  );
}

export default MultiLineInput;
