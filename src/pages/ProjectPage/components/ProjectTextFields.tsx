import React from 'react';

import { CardContent, TextField } from '@mui/material';

import ILangModel from '../../../models/langModel';
import IProject from '../../../models/projectModel';

interface ProjectTextFieldsProps {
  project: IProject;
  handleChangeWithLang: <
    T extends keyof Pick<IProject, 'name' | 'description'>,
    U extends keyof ILangModel,
  >(
    field: T,
    language: U,
    value: string
  ) => void;
  handleChangeURL: <T extends keyof Pick<IProject, 'githubURL' | 'projectURL'>>(
    field: T,
    value: string
  ) => void;
}

function ProjectTextFields({
  project,
  handleChangeWithLang,
  handleChangeURL,
}: ProjectTextFieldsProps) {
  const textFieldStyle = { width: '100%' };

  return (
    <>
      <CardContent>
        <TextField
          sx={textFieldStyle}
          placeholder="Имя проекта"
          label="Имя проекта на русском"
          value={project.name.ru}
          onChange={(e) => handleChangeWithLang('name', 'ru', e.target.value)}
        />
      </CardContent>

      <CardContent>
        <TextField
          sx={textFieldStyle}
          placeholder="Name of project"
          label="Имя проекта на английском"
          value={project.name.en}
          onChange={(e) => handleChangeWithLang('name', 'en', e.target.value)}
        />
      </CardContent>

      <CardContent>
        <TextField
          multiline
          sx={textFieldStyle}
          placeholder="Проект создан с целью..."
          label="Описание проекта на русском"
          value={project.description.ru}
          onChange={(e) =>
            handleChangeWithLang('description', 'ru', e.target.value)
          }
        />
      </CardContent>

      <CardContent>
        <TextField
          multiline
          sx={textFieldStyle}
          placeholder="This project can be..."
          label="Описание проекта на английском"
          value={project.description.en}
          onChange={(e) =>
            handleChangeWithLang('description', 'en', e.target.value)
          }
        />
      </CardContent>

      <CardContent>
        <TextField
          multiline
          sx={textFieldStyle}
          placeholder="https://..."
          label="ссылка на github"
          value={project.githubURL}
          onChange={(e) => handleChangeURL('githubURL', e.target.value)}
        />
      </CardContent>

      <CardContent>
        <TextField
          multiline
          sx={textFieldStyle}
          placeholder="https://..."
          label="ссылка на проект"
          value={project.projectURL}
          onChange={(e) => handleChangeURL('projectURL', e.target.value)}
        />
      </CardContent>
    </>
  );
}

export default ProjectTextFields;
