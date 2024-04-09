import React, { useRef } from 'react';
import {
  Box, Card, CardContent, CardHeader, CardMedia, IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import './ImagePicker.scss';

interface Props {
  image: string,
  setImage: (image: string) => void,
  defaultImage: string,
  description?: string,
}

function ImagePicker(props: Props) {
  const {
    image,
    setImage,
    defaultImage,
    description = 'Изображение',
  } = props;
  const fileInput = useRef<HTMLInputElement | null>(null);

  const cn = 'image-picker';

  const handleChangeImage = () => {
    if (!fileInput.current) return;

    fileInput.current.click();
  };

  const handleDeleteImage = () => {
    if (fileInput.current) {
      setImage(defaultImage);

      fileInput.current.value = '';
    }
  };
  const changeImage = () => {
    if (!fileInput?.current || !fileInput.current.files) return;

    const fileReader = new FileReader();

    fileReader.readAsDataURL(fileInput.current?.files[0]);

    fileReader.onload = (event) => {
      if (event.target === null) return;

      if (typeof event.target.result !== 'string') return;

      setImage(event.target.result);
    };
  };

  return (
    <CardContent>
      <Card className={cn} sx={{ width: '300px' }}>
        <CardHeader
          subheader={description}
          action={(
            <Box className={`${cn}__buttons-wrapper`}>
              <IconButton
                onClick={handleChangeImage}
                className={`${cn}__delete-button`}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={handleDeleteImage}
                className={`${cn}__delete-button`}
              >
                <DeleteForeverIcon />
              </IconButton>
            </Box>
          )}
        />

        <CardMedia
          component="img"
          alt="изображение проекта"
          image={image}
        />
      </Card>
      <input
        type="file"
        className={`${cn}__input`}
        ref={fileInput}
        accept=".jpg,.jpeg,.png"
        onChange={changeImage}
      />
    </CardContent>
  );
}

ImagePicker.defaultProps = {
  description: undefined,
};

export default ImagePicker;
