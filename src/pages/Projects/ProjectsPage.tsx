import React from 'react';
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
  IconButton, Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PageLoader from '../../widgets/PageLoader/PageLoader';
import { useGetProjectsQuery } from '../../app/store/slices/queryApi';

function ProjectsPage() {
  // TODO change params of useGetProjectsQuery
  const { data: projects = [], isLoading } = useGetProjectsQuery('test');

  const editButton = (
    <IconButton>
      <EditIcon />
    </IconButton>
  );

  return isLoading ? (<PageLoader />) : (
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
                    <Box>
                      <Typography color="gray" fontSize={12}>ru</Typography>
                      {row.name.ru}
                    </Box>
                    <Box>
                      <Typography color="gray" fontSize={12}>en</Typography>
                      {row.name.en}
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack>
                    <Box>
                      <Typography color="gray" fontSize={12}>ru</Typography>
                      {row.description.ru}
                    </Box>
                    <Box>
                      <Typography color="gray" fontSize={12}>en</Typography>
                      {row.description.en}
                    </Box>
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
