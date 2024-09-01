import React from 'react';
import { Box, TextField } from '@mui/material';

import IUserInfo from 'models/userInfoModel';
import ILangModel from 'models/langModel';

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
  disabled: boolean
}

function MultiLineInput({
  handleChange, placeholder, value, field, language, disabled,
}: Props) {
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
        value={value}
        disabled={disabled}
        onChange={(e) => handleChange(field, language, e.target.value)}
      />
    </Box>
  );
}

export default MultiLineInput;
