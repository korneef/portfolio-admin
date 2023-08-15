import React, { useEffect, useState } from 'react';
import {
  Container, Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import SingleLineInput from '../../feautures/SingleLineInput/SingleLineInput';
import MultiLineInput from '../../feautures/MultiLineInput/MultiLineInput';
import getData from '../../app/firebase/getData';
import PageLoader from '../../widgets/PageLoader/PageLoader';
import IUserInfo from '../../models/userInfoModel';
import ILangModel from '../../models/langModel';

function MainInfoPage() {
  const [userInfo, setUserInfo] = useState<IUserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData('/userInfo')
      .then((data) => {
        setUserInfo(() => data);
        setIsLoading(false);
      });
  }, []);

  const handleChange = <T extends keyof IUserInfo, U extends keyof ILangModel>(
    field: T,
    language: U,
    value: string) => {
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

  return (
    isLoading || userInfo === null
      ? <PageLoader />
      : (
        <Container sx={{ paddingTop: 5 }}>
          <Typography variant="h6" align="center" marginBottom={5}>Раздел редактирования личной информации</Typography>
          <Grid container spacing={2}>
            <Grid xs={6}>
              <SingleLineInput
                handleChange={handleChange}
                language="ru"
                field="firstName"
                placeholder="Имя на русском"
                value={userInfo.firstName.ru}
              />
            </Grid>
            <Grid xs={6}>
              <SingleLineInput
                handleChange={handleChange}
                language="en"
                field="firstName"
                placeholder="Имя на английском"
                value={userInfo.firstName.en}
              />
            </Grid>
            <Grid xs={6}>
              <SingleLineInput
                handleChange={handleChange}
                language="ru"
                field="lastName"
                placeholder="Фамилия на русском"
                value={userInfo.lastName.ru}
              />
            </Grid>
            <Grid xs={6}>
              <SingleLineInput
                handleChange={handleChange}
                language="en"
                field="lastName"
                placeholder="Фамилия на английском"
                value={userInfo.lastName.en}
              />
            </Grid>
            <Grid xs={6}>
              <MultiLineInput
                placeholder="О себе на русском"
                value={userInfo.about.ru}
              />
            </Grid>
            <Grid xs={6}>
              <MultiLineInput
                placeholder="О себе на английском"
                value={userInfo.about.en}
              />
            </Grid>
            <Grid xs={6}>
              <MultiLineInput
                placeholder="Саммари на русском"
                value={userInfo.summary.ru}
              />
            </Grid>
            <Grid xs={6}>
              <MultiLineInput
                placeholder="Саммари на английском"
                value={userInfo.summary.en}
              />
            </Grid>
          </Grid>
        </Container>
      )
  );
}

export default MainInfoPage;
