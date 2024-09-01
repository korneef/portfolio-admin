import React, { useState } from 'react';

import CancelIcon from '@mui/icons-material/Cancel';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, TableCell, TableRow, TextField } from '@mui/material';

import {
  useUpdateTagMutation,
  useRemoveTagMutation,
} from '../../app/store/slices/queryApi';

interface Props {
  tag: string;
  id: string;
}

function TagCell({ tag, id }: Props) {
  const [updateTag] = useUpdateTagMutation();
  const [deleteTag] = useRemoveTagMutation();

  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState(tag);

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  const editButton = (
    <>
      <IconButton onClick={() => setIsEdit(!isEdit)}>
        <EditIcon />
      </IconButton>
      <IconButton onClick={() => deleteTag(id)}>
        <DeleteForeverIcon />
      </IconButton>
    </>
  );

  const saveAndDeleteButtons = (
    <>
      <IconButton
        onClick={() => {
          updateTag({ key: id, data: value }).then(() => setIsEdit(false));
        }}
      >
        <DoneIcon />
      </IconButton>
      <IconButton
        onClick={() => {
          setIsEdit(false);
          setValue(tag);
        }}
      >
        <CancelIcon />
      </IconButton>
    </>
  );

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell>
        <TextField
          disabled={!isEdit}
          variant="outlined"
          size="small"
          value={value}
          fullWidth
          onChange={(e) => handleChange(e.target.value)}
        />
      </TableCell>
      <TableCell align="right">
        {isEdit ? saveAndDeleteButtons : editButton}
      </TableCell>
    </TableRow>
  );
}

export default TagCell;
