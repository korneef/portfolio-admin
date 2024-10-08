import React, { useState } from 'react';

import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import { useGetTagsQuery } from '../../app/store/slices/queryApi';
import AddNewTagModal from '../../features/AddNewTagModal/AddNewTagModal';
import TagCell from '../../features/TagCell/TagCell';
import PageLoader from '../../widgets/PageLoader/PageLoader';

function Dictionaries() {
  const { data: tags = [], isLoading } = useGetTagsQuery({});

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  return isLoading ? (
    <PageLoader />
  ) : (
    <Container sx={{ paddingTop: 5 }}>
      <TableContainer component={Paper}>
        <Table aria-label="tags table" size="small">
          <TableHead>
            <TableRow>
              <TableCell>Наименование</TableCell>
              <TableCell align="right">Редактировать</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tags.map((row) => (
              <TagCell key={row.id} id={row.id} tag={row.tag} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        sx={{
          paddingTop: 1,
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Button variant="contained" onClick={handleOpen}>
          Добавить
        </Button>
        <AddNewTagModal open={open} handleClose={handleClose} />
      </Box>
    </Container>
  );
}

export default Dictionaries;
