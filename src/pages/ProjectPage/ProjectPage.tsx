import React, { useMemo, useState } from 'react';
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
import { nanoid } from '@reduxjs/toolkit';
import IProject from '../../models/projectModel';
import ILangModel from '../../models/langModel';
import { useCreateProjectMutation, useGetTagsQuery } from '../../app/store/slices/queryApi';

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
  const isNew = id === 'new';
  const [project, setProject] = useState<IProject>({ ...defaultValues, id: nanoid() });

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
