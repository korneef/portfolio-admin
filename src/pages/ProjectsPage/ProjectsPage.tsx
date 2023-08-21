import React, { useMemo } from 'react';
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
import { useNavigate } from 'react-router';
import PageLoader from '../../widgets/PageLoader/PageLoader';
import { useGetProjectsQuery, useGetTagsQuery } from '../../app/store/slices/queryApi';

function ProjectsPage() {
  const navigate = useNavigate();
  // TODO change params of useGetProjectsQuery
  const { data: projects = [], isLoading } = useGetProjectsQuery('test');
  const { data: tags = [] } = useGetTagsQuery('test');
  const tagsDictionary = useMemo(() => {
    const dictionary: Record<string, string> = {};
    tags.forEach((tagData) => {
      dictionary[tagData.id] = tagData.tag;
    });
    return dictionary;
  }, [tags]);

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
                key={row.id}
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
                      row.tags.map((item) => <Chip key={item} label={tagsDictionary[item]} />)
                    }
                  </Stack>

                </TableCell>
                <TableCell>{row.image}</TableCell>
                <TableCell>
                  <IconButton onClick={() => navigate(row.id)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
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
        <Button
          variant="contained"
          onClick={() => navigate('new')}
        >
          Добавить проект
        </Button>
      </Box>
    </Container>
  );
}

export default ProjectsPage;
