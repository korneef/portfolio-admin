import React, {
  useEffect, useMemo, useState,
} from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Container,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { nanoid } from '@reduxjs/toolkit';
import IProject from '../../models/projectModel';
import ILangModel from '../../models/langModel';
import {
  useCreateProjectMutation,
  useGetOneProjectQuery,
  useGetTagsQuery,
  useUpdateProjectMutation,
} from '../../app/store/slices/queryApi';
import EmptyImage from '../../share/assets/images/no-photo-icon.png';
import PageLoader from '../../widgets/PageLoader/PageLoader';
import ImagePicker from '../../widgets/ImageContainer/ImagePicker';

const defaultValues: IProject = {
  id: '',
  name: {
    ru: '',
    en: '',
  },
  description: {
    ru: '',
    en: '',
  },
  tags: [],
};

function ProjectPage() {
  const [createProject] = useCreateProjectMutation();
  const [updateProject] = useUpdateProjectMutation();
  const [image, setImage] = useState(EmptyImage);
  const { data: tags = [] } = useGetTagsQuery('');
  const tagsDictionary = useMemo(() => {
    const dictionary: Record<string, string> = {};
    tags.forEach((tagData) => {
      dictionary[tagData.id] = tagData.tag;
    });
    return dictionary;
  }, [tags]);
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: downloadedProject, isLoading } = useGetOneProjectQuery(id || '');
  const isNew = id === 'new';
  const [project, setProject] = useState<IProject>({ ...defaultValues, id: nanoid() });

  useEffect(() => {
    if (downloadedProject) {
      setProject(downloadedProject.project);
      if (!downloadedProject.image) return;
      setImage(downloadedProject.image);
    }
  }, [downloadedProject]);

  const handleChangeWithLang = <T extends keyof Pick<IProject, 'name' | 'description'>, U extends keyof ILangModel>(
    field: T,
    language: U,
    value: string,
  ) => {
    setProject((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        [language]: value,
      },
    }));
  };

  const handleChangeURL = <T extends keyof Pick<IProject, 'githubURL' | 'projectURL'>>(
    field: T,
    value: string,
  ) => {
    setProject((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleChangeTag = (value: Array<string>) => {
    const tagsId = value.map((tag) => {
      const foundTag = tags.find((tagData) => tagData.tag === tag);
      return foundTag ? foundTag.id : '';
    });
    setProject((prevState) => ({
      ...prevState,
      tags: tagsId,
    }));
  };

  return (isLoading
    ? <PageLoader />
    : (
      <Container>
        <Card>
          <CardHeader
            title={isNew ? 'Добавить проект' : 'Редактировать проект'}
            action={(
              <IconButton onClick={() => navigate('../projects')}>
                <CancelIcon />
              </IconButton>
          )}
          />
          <CardContent>
            <TextField
              sx={{
                width: '100%',
              }}
              placeholder="Имя проекта"
              label="Имя проекта на русском"
              value={project.name.ru}
              onChange={(e) => handleChangeWithLang('name', 'ru', e.target.value)}
            />
          </CardContent>
          <CardContent>
            <TextField
              sx={{
                width: '100%',
              }}
              placeholder="Name of project"
              label="Имя проекта на английском"
              value={project.name.en}
              onChange={(e) => handleChangeWithLang('name', 'en', e.target.value)}
            />
          </CardContent>
          <CardContent>
            <TextField
              multiline
              sx={{
                width: '100%',
              }}
              placeholder="Проект создан с целью..."
              label="Описание проекта на русском"
              value={project.description.ru}
              onChange={(e) => handleChangeWithLang('description', 'ru', e.target.value)}
            />
          </CardContent>
          <CardContent>
            <TextField
              multiline
              sx={{
                width: '100%',
              }}
              placeholder="This project can be..."
              label="Описание проекта на английском"
              value={project.description.en}
              onChange={(e) => handleChangeWithLang('description', 'en', e.target.value)}
            />
          </CardContent>
          <CardContent>
            <TextField
              multiline
              sx={{
                width: '100%',
              }}
              placeholder="https://..."
              label="ссылка на github"
              value={project.githubURL}
              onChange={(e) => handleChangeURL('githubURL', e.target.value)}
            />
          </CardContent>
          <CardContent>
            <TextField
              multiline
              sx={{
                width: '100%',
              }}
              placeholder="https://..."
              label="ссылка на проект"
              value={project.projectURL}
              onChange={(e) => handleChangeURL('projectURL', e.target.value)}
            />
          </CardContent>
          <CardContent>
            <FormControl sx={{ width: '100%' }}>
              <InputLabel id="multiple-chip-label">Tags</InputLabel>
              <Select
                labelId="multiple-chip-label"
                id="multiple-chip"
                multiple
                onChange={(e: SelectChangeEvent<string[]>) => (
                  handleChangeTag(e.target.value as string[]))}
                value={project.tags.map((tag) => tagsDictionary[tag])}
                input={<OutlinedInput id="select-multiple-chip" label="Tags" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value || nanoid()} label={value || 'deleted'} />
                    ))}
                  </Box>
                )}
              >
                {tags.map(({ id: tagId, tag }) => (
                  <MenuItem
                    key={tagId}
                    value={tag || 'deleted'}
                  >
                    {tag || 'deleted'}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </CardContent>
          <ImagePicker setImage={setImage} defaultImage={EmptyImage} image={image} description="Изображение проекта" />
        </Card>
        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: 3,
        }}
        >
          <Button
            variant="contained"
            onClick={() => {
              if (isNew) {
                createProject([project, image])
                  .then(() => {
                    navigate('../projects');
                  });
              } else {
                // TODO fix id || ''
                updateProject([id || '', project, image])
                  .then(() => alert('Проект сохранен успешно'))
                  .catch((err) => alert(`Ошибка сохранения: ${err}`));
              }
            }}
          >
            {isNew ? 'Добавить' : 'Сохранить'}
          </Button>
        </Box>
      </Container>
    )
  );
}

export default ProjectPage;
