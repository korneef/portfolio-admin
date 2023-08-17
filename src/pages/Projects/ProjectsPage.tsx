import React, { useEffect, useState } from 'react';
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
  Chip,
  Stack,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import getData from '../../app/firebase/getData';
import IProject from '../../models/projectModel';

function ProjectsPage() {
  const [projects, setProjects] = useState<Array<IProject>>([]);

  useEffect(() => {
    getData('/projects')
      .then((data) => {
        setProjects(data);
      });
  }, []);

  const editButton = (
    <IconButton>
      <EditIcon />
    </IconButton>
  );

  return (
    <Container sx={{ paddingTop: 5 }}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Наименование</TableCell>
              <TableCell>Описание</TableCell>
              <TableCell>Тэги</TableCell>
              <TableCell>Изображение</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((row) => (
              <TableRow
                key={row.name.ru}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Stack>
                    <Box>{row.name.ru}</Box>
                    <Box>{row.name.en}</Box>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack>
                    <Box>{row.description.ru}</Box>
                    <Box>{row.description.en}</Box>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack spacing={1} direction="row" flexWrap="wrap" useFlexGap>
                    {
                      row.tags.map((item) => (<Chip key={item} label={item} />))
                    }
                  </Stack>

                </TableCell>
                <TableCell>{row.image}</TableCell>
                <TableCell>{editButton}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{
        marginTop: 2,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
      >
        <Button variant="contained">Добавить проект</Button>
      </Box>
    </Container>
  );
}

export default ProjectsPage;
