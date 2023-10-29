import React from 'react';
import {
  Button, Container, Link, TableBody, TableCell, TableRow,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useUploadCVMutation, useGetCVurlQuery, useDeleteCVMutation } from '../../app/store/slices/queryApi';

function CvPage() {
  const [uploadCV] = useUploadCVMutation();
  const [deleteCV] = useDeleteCVMutation();
  const { data: ruCvUrl } = useGetCVurlQuery('ru');
  const { data: enCvUrl } = useGetCVurlQuery('en');

  // todo move language to type
  const handleInputChange = async (evt: React.ChangeEvent<HTMLInputElement>, language: 'ru' | 'en') => {
    if (evt.target.files === null) return;
    const cvFile = evt.target.files[0];
    const cvFileBlob = new Blob([cvFile], { type: cvFile.type });
    await uploadCV({
      file: cvFileBlob,
      language,
      name: 'Valentin_Korneev[frontend_developer]',
    });
  };
  const withoutFile = (<div>Резюме не загружено</div>);

  return (
    <Container>
      <TableBody>
        <TableRow>
          <TableCell>
            {ruCvUrl ? <Link href={ruCvUrl}>Резюме на русском</Link> : withoutFile}
          </TableCell>
          <TableCell>
            <Button
              variant="contained"
              component="label"
              startIcon={<CloudUploadIcon />}
            >
              Upload Russian CV
              <input
                type="file"
                accept="application/pdf"
                hidden
                onChange={(e) => handleInputChange(e, 'ru')}
              />
            </Button>
          </TableCell>
          <TableCell>
            <Button
              variant="contained"
              component="label"
              onClick={() => deleteCV(({
                language: 'ru',
                name: 'Valentin_Korneev[frontend_developer]',
              }))}
            >
              Delete CV
            </Button>
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell>
            {enCvUrl ? <Link href={enCvUrl}>Резюме на английском</Link> : withoutFile}
          </TableCell>
          <TableCell>
            <Button
              variant="contained"
              component="label"
              startIcon={<CloudUploadIcon />}
            >
              Upload English CV
              <input
                type="file"
                accept="application/pdf"
                hidden
                onChange={(e) => handleInputChange(e, 'en')}
              />
            </Button>
          </TableCell>
          <TableCell>
            <Button
              variant="contained"
              component="label"
              onClick={() => deleteCV(({
                language: 'en',
                name: 'Valentin_Korneev[frontend_developer]',
              }))}
            >
              Delete CV
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>

    </Container>
  );
}

export default CvPage;
