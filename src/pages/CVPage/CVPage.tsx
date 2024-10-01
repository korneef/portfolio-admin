import React from 'react';

import { Container, TableBody } from '@mui/material';

import {
  useUploadCVMutation,
  useGetCVurlQuery,
  useDeleteCVMutation,
} from '../../app/store/slices/queryApi';

import CVRow from './CVRow/CVRow';

function CvPage() {
  const [uploadCV] = useUploadCVMutation();
  const [deleteCV] = useDeleteCVMutation();

  const { data: ruCvUrl } = useGetCVurlQuery('ru');
  const { data: enCvUrl } = useGetCVurlQuery('en');

  // todo move language to type
  const handleInputChange = async (
    evt: React.ChangeEvent<HTMLInputElement>,
    language: 'ru' | 'en'
  ) => {
    if (evt.target.files === null) return;

    const cvFile = evt.target.files[0];
    const cvFileBlob = new Blob([cvFile], { type: cvFile.type });

    await uploadCV({
      file: cvFileBlob,
      language,
      name: 'Valentin_Korneev[frontend_developer]',
    });
  };

  return (
    <Container>
      <TableBody>
        <CVRow
          language="ru"
          CVUrl={ruCvUrl}
          name="Valentin_Korneev[frontend_developer]"
          buttonTitle="Upload Russian CV"
          description="Резюме на русском"
          handleInputChange={handleInputChange}
          deleteCV={deleteCV}
        />
        <CVRow
          language="en"
          CVUrl={enCvUrl}
          name="Valentin_Korneev[frontend_developer]"
          buttonTitle="Upload English CV"
          description="Резюме на английском"
          handleInputChange={handleInputChange}
          deleteCV={deleteCV}
        />
      </TableBody>
    </Container>
  );
}

export default CvPage;
