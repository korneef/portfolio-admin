import React, {
  useEffect, useMemo, useRef, useState,
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
  Select, SelectChangeEvent,
  TextField,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
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
import './ProjectPage.scss';

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
  image: 'imageUrl',
};

function ProjectPage() {
  const [createProject] = useCreateProjectMutation();
  const [updateProject] = useUpdateProjectMutation();
  const { data: tags = [] } = useGetTagsQuery('test');
  const tagsDictionary = useMemo(() => {
    const dictionary: Record<string, string> = {};
    tags.forEach((tagData) => {
      dictionary[tagData.id] = tagData.tag;
    });
    return dictionary;
  }, [tags]);
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: downloadedProject } = useGetOneProjectQuery(id || '');
  const isNew = id === 'new';
  const [project, setProject] = useState<IProject>({ ...defaultValues, id: nanoid() });
  const fileInput = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (downloadedProject) {
      setProject(downloadedProject);
    }
  }, [downloadedProject]);

  const handleChange = <T extends keyof Pick<IProject, 'name' | 'description'>, U extends keyof ILangModel>(
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

  const handleClickOnImage = () => {
    if (!fileInput.current) return;
    fileInput.current.click();
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

  const cn = 'project-page-filepicker';

  return (
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
            onChange={(e) => handleChange('name', 'ru', e.target.value)}
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
            onChange={(e) => handleChange('name', 'en', e.target.value)}
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
            onChange={(e) => handleChange('description', 'ru', e.target.value)}
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
            onChange={(e) => handleChange('description', 'en', e.target.value)}
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
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {tags.map(({ id: tagId, tag }) => (
                <MenuItem
                  key={tagId}
                  value={tag}
                >
                  {tag}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </CardContent>
        <CardContent>
          <Card className={cn} sx={{ width: '200px' }}>
            <IconButton sx={{ position: 'absolute' }} className={`${cn}__delete-button`}>
              <DeleteForeverIcon />
            </IconButton>
            <button
              type="button"
              onClick={handleClickOnImage}
              className={`${cn}__button`}
            >
              <img
                className={`${cn}__image`}
                src={EmptyImage}
                alt="Изображение проекта"
              />
            </button>
          </Card>
          <input type="file" className={`${cn}__input`} ref={fileInput} />
        </CardContent>
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
              createProject(project)
                .then(() => {
                  navigate('../projects');
                });
            } else {
              // TODO fix id || ''
              updateProject([id || '', project])
                .then(() => alert('Проект сохранен успешно'))
                .catch((err) => alert(`Ошибка сохранения: ${err}`));
            }
          }}
        >
          {isNew ? 'Добавить' : 'Сохранить'}
        </Button>
      </Box>
    </Container>
  );
}

export default ProjectPage;
