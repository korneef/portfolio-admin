import React from 'react';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button, Link, TableCell, TableRow } from '@mui/material';

import ILangModel from '../../../models/langModel';

interface CVRowProps {
  language: keyof ILangModel;
  name: string;
  deleteCV: (cv: { language: keyof ILangModel; name: string }) => void;
  CVUrl: string | undefined | null;
  handleInputChange: (
    value: React.ChangeEvent<HTMLInputElement>,
    language: keyof ILangModel
  ) => void;
  buttonTitle: string;
  description: string;
}

export default function CVRow({
  CVUrl,
  deleteCV,
  handleInputChange,
  language,
  name,
  buttonTitle,
  description,
}: CVRowProps) {
  return (
    <TableRow>
      <TableCell>
        {CVUrl ? (
          <Link href={CVUrl}>{description}</Link>
        ) : (
          <div>Резюме не загружено</div>
        )}
      </TableCell>

      <TableCell>
        <Button
          variant="contained"
          component="label"
          startIcon={<CloudUploadIcon />}
        >
          {buttonTitle}
          <input
            type="file"
            accept="application/pdf"
            hidden
            onChange={(e) => handleInputChange(e, language)}
          />
        </Button>
      </TableCell>

      <TableCell>
        <Button
          variant="contained"
          component="label"
          onClick={() =>
            deleteCV({
              language,
              name,
            })
          }
        >
          Delete CV
        </Button>
      </TableCell>
    </TableRow>
  );
}
