import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  Button,
  Card, CardContent, CardHeader, Container, IconButton, TextField,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { nanoid } from '@reduxjs/toolkit';
import IProject from '../../models/projectModel';
import ILangModel from '../../models/langModel';
import { useCreateProjectMutation } from '../../app/store/slices/queryApi';

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
  tags: ['qwe', '2', 'asdfasdf', 'asdf'],
  image: 'imageUrl',
};

function ProjectPage() {
  const [createProject] = useCreateProjectMutation();
  const navigate = useNavigate();
  const { id } = useParams();
  const isNew = id === 'new';
  const [project, setProject] = useState<IProject>({ ...defaultValues, id: nanoid() });
  console.log(project);

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

      </Card>
      <Button
        onClick={() => {
          createProject(project)
            .then(() => {
              navigate('../projects');
            });
        }}
      >
        {isNew ? 'Добавить' : 'Сохранить'}
      </Button>
    </Container>
  );
}

export default ProjectPage;
