import React, { useEffect, useState } from 'react';
import {
  Card, CardHeader,
  Container, IconButton,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import CancelIcon from '@mui/icons-material/Cancel';
import SingleLineInput from '../../feautures/SingleLineInput/SingleLineInput';
import MultiLineInput from '../../feautures/MultiLineInput/MultiLineInput';
import PageLoader from '../../widgets/PageLoader/PageLoader';
import IUserInfo from '../../models/userInfoModel';
import ILangModel from '../../models/langModel';
import { useGetUserInfoQuery, useUpdateUserInfoMutation } from '../../app/store/slices/userInfoApi';
import ImagePicker from '../../widgets/ImageContainer/ImagePicker';
import EmptyImage from '../../share/assets/images/no-photo-icon.png';

// TODO refactor this component

function UserInfoPage() {
  const { data = null, isLoading } = useGetUserInfoQuery('');
  const [updateUserInfo] = useUpdateUserInfoMutation();

  const [isEdit, setIsEdit] = useState(false);
  const [userInfo, setUserInfo] = useState(data?.user || null);
  const [image, setImage] = useState(EmptyImage);

  useEffect(() => {
    if (data === null) return;

    setUserInfo(data.user);

    if (data.userImage === null) return;

    setImage(data.userImage);
  }, [data]);

  const handleChange = <T extends keyof IUserInfo, U extends keyof ILangModel>(
    field: T,
    language: U,
    value: string,
  ) => {
    if (userInfo === undefined) return;

    setUserInfo((prevState) => {
      if (prevState === null) return null;

      return {
        ...prevState,
        [field]: {
          ...prevState[field],
          [language]: value,
        },
      };
    });
  };

  const handleSave = () => {
    setIsEdit(false);

    if (userInfo === undefined || userInfo === null) return;

    updateUserInfo([userInfo, image]);
  };

  const handleEdit = () => {
    if (data === null || data === undefined) return;

    if (isEdit) {
      setUserInfo(() => data.user);
      setIsEdit(false);
    } else {
      setIsEdit(!isEdit);
    }
  };

  const editButton = (
    <IconButton onClick={handleEdit}>
      <EditIcon />
    </IconButton>
  );

  const saveAndDeleteButtons = (
    <>
      <IconButton onClick={handleSave}>
        <DoneIcon />
      </IconButton>
      <IconButton onClick={handleEdit}>
        <CancelIcon />
      </IconButton>
    </>
  );

  return (
    isLoading || userInfo === null
      ? <PageLoader />
      : (
        <Container sx={{ paddingTop: 5 }}>
          <Card>
            <CardHeader
              title="Личная информация"
              action={isEdit ? saveAndDeleteButtons : editButton}
            />
            <Grid container spacing={2}>
              <Grid xs={6}>
                <SingleLineInput
                  handleChange={handleChange}
                  language="ru"
                  field="firstName"
                  placeholder="Имя на русском"
                  value={userInfo.firstName.ru}
                  disabled={!isEdit}
                />
              </Grid>
              <Grid xs={6}>
                <SingleLineInput
                  handleChange={handleChange}
                  language="en"
                  field="firstName"
                  placeholder="Имя на английском"
                  value={userInfo.firstName.en}
                  disabled={!isEdit}
                />
              </Grid>
              <Grid xs={6}>
                <SingleLineInput
                  handleChange={handleChange}
                  language="ru"
                  field="lastName"
                  placeholder="Фамилия на русском"
                  value={userInfo.lastName.ru}
                  disabled={!isEdit}
                />
              </Grid>
              <Grid xs={6}>
                <SingleLineInput
                  handleChange={handleChange}
                  language="en"
                  field="lastName"
                  placeholder="Фамилия на английском"
                  value={userInfo.lastName.en}
                  disabled={!isEdit}
                />
              </Grid>
              <Grid xs={6}>
                <MultiLineInput
                  value={userInfo.about.ru}
                  placeholder="О себе на русском"
                  handleChange={handleChange}
                  language="ru"
                  field="about"
                  disabled={!isEdit}
                />
              </Grid>
              <Grid xs={6}>
                <MultiLineInput
                  placeholder="О себе на английском"
                  value={userInfo.about.en}
                  handleChange={handleChange}
                  language="en"
                  field="about"
                  disabled={!isEdit}
                />
              </Grid>
              <Grid xs={6}>
                <MultiLineInput
                  placeholder="Саммари на русском"
                  value={userInfo.summary.ru}
                  handleChange={handleChange}
                  language="ru"
                  field="summary"
                  disabled={!isEdit}
                />
              </Grid>
              <Grid xs={6}>
                <MultiLineInput
                  placeholder="Саммари на английском"
                  value={userInfo.summary.en}
                  handleChange={handleChange}
                  language="en"
                  field="summary"
                  disabled={!isEdit}
                />
              </Grid>
              <Grid>
                <ImagePicker image={image} defaultImage={EmptyImage} setImage={setImage} />
              </Grid>
            </Grid>
          </Card>
        </Container>
      )
  );
}

export default UserInfoPage;
