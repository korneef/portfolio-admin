import React, { useState } from 'react';
import {
  Box, IconButton, TextField,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import DoneIcon from '@mui/icons-material/Done';
import IUserInfo from '../../models/userInfoModel';
import ILangModel from '../../models/langModel';

interface Props {
  value: string;
  placeholder: string;
  handleChange: <T extends keyof IUserInfo, U extends keyof ILangModel>(
    field: T,
    language: U,
    value: string
  ) => void,
  field: keyof IUserInfo,
  language: keyof ILangModel,
}

function SingleLineInput({
  handleChange, placeholder, value, field, language,
}: Props) {
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const editButton = (
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
        placeholder={placeholder}
        label={placeholder}
        value={value}
        disabled={!isEdit}
        onChange={(e) => handleChange(field, language, e.target.value)}
      />
      {isEdit ? saveAndDeleteButtons : editButton}
    </Box>
  );
}

export default SingleLineInput;
