import React, { useEffect, useMemo, useState } from 'react';

import CancelIcon from '@mui/icons-material/Cancel';
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
} from '@mui/material';
import { nanoid } from '@reduxjs/toolkit';
import { useNavigate, useParams } from 'react-router';

import ImagePicker from 'widgets/ImageContainer/ImagePicker';
import PageLoader from 'widgets/PageLoader/PageLoader';

import EmptyImage from 'shared/assets/images/no-photo-icon.png';

import {
  useCreateProjectMutation,
  useGetOneProjectQuery,
  useGetTagsQuery,
  useUpdateProjectMutation,
} from '../../app/store/slices/queryApi';
import ILangModel from '../../models/langModel';
import IProject from '../../models/projectModel';

import ProjectTextFields from './components/ProjectTextFields';
import DEFAULT_PROJECT_VALUES from './constants';

function ProjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [createProject] = useCreateProjectMutation();
  const [updateProject] = useUpdateProjectMutation();

  const { data: tags = [] } = useGetTagsQuery('');

  const [image, setImage] = useState(EmptyImage);
  const [project, setProject] = useState<IProject>({
    ...DEFAULT_PROJECT_VALUES,
    id: nanoid(),
  });

  const tagsDictionary = useMemo(() => {
    const dictionary = tags.reduce<Record<string, string>>(
      (acc, { id: tagId, tag }) => {
        acc[tagId] = tag;
        return acc;
      },
      {}
    );

    project?.tags.forEach((item) => {
      if (!dictionary[item]) {
        dictionary[item] = `deleted_${nanoid(4)}`;
      }
    });

    return dictionary;
  }, [project, tags]);

  const selectedTags = project.tags.map((tag) => tagsDictionary[tag]);

  const { data: downloadedProject, isLoading } = useGetOneProjectQuery(
    id || ''
  );
  const isNew = id === 'new';

  const handleChangeWithLang = <
    T extends keyof Pick<IProject, 'name' | 'description'>,
    U extends keyof ILangModel,
  >(
    field: T,
    language: U,
    value: string
  ) => {
    setProject((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        [language]: value,
      },
    }));
  };

  const handleChangeURL = <
    T extends keyof Pick<IProject, 'githubURL' | 'projectURL'>,
  >(
    field: T,
    value: string
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

  useEffect(() => {
    if (!downloadedProject) return;

    setProject(downloadedProject.project);

    if (downloadedProject.image) setImage(downloadedProject.image);
  }, [downloadedProject]);

  return isLoading ? (
    <PageLoader />
  ) : (
    <Container>
      <Card>
        <CardHeader
          title={isNew ? 'Добавить проект' : 'Редактировать проект'}
          action={
            <IconButton onClick={() => navigate('../projects')}>
              <CancelIcon />
            </IconButton>
          }
        />

        <ProjectTextFields
          project={project}
          handleChangeWithLang={handleChangeWithLang}
          handleChangeURL={handleChangeURL}
        />

        <CardContent>
          <FormControl sx={{ width: '100%' }}>
            <InputLabel id="multiple-chip-label">Tags</InputLabel>
            <Select
              labelId="multiple-chip-label"
              id="multiple-chip"
              multiple
              onChange={(e: SelectChangeEvent<string[]>) =>
                handleChangeTag(e.target.value as string[])
              }
              value={selectedTags}
              input={<OutlinedInput id="select-multiple-chip" label="Tags" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={nanoid()} label={value} />
                  ))}
                </Box>
              )}
            >
              {Object.entries(tagsDictionary).map(([tagId, tag]) => (
                <MenuItem key={tagId} value={tag}>
                  {tag}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </CardContent>

        <ImagePicker
          setImage={setImage}
          defaultImage={EmptyImage}
          image={image}
          description="Изображение проекта"
        />
      </Card>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: 3,
        }}
      >
        <Button
          variant="contained"
          onClick={() => {
            if (isNew) {
              createProject([project, image]).then(() => {
                navigate('../projects');
              });
            } else {
              if (!id) return;
              updateProject([id, project, image])
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
