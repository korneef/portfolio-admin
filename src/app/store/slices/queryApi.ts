import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  child, get, getDatabase, ref, set,
} from 'firebase/database';
import { dbRef } from '../../firebase/firebase';
import ProjectModel from '../../../models/projectModel';
import IUserInfo from '../../../models/userInfoModel';

// TODO endpoints also should return errors
export const queryApi = createApi({
  baseQuery: fakeBaseQuery(),
  tagTypes: ['UserInfo', 'Posts'],
  endpoints: (build) => ({
    getProjects: build.query({
      async queryFn() {
        try {
          const snapshot = await get(child(dbRef, '/projects'));

          if (snapshot.exists()) {
            return { data: snapshot.val() as Array<ProjectModel>, isError: false };
          }
          return { data: [], isError: false };
        } catch (error) {
          return { data: [], isError: true };
        }
      },
    }),

    getUserInfo: build.query({
      async queryFn() {
        try {
          const snapshot = await get(child(dbRef, '/userInfo'));
          if (snapshot.exists()) {
            return { data: snapshot.val() as IUserInfo, isError: false };
          }
          return { data: null, isError: false };
        } catch (error) {
          return { data: null, isError: true };
        }
      },
      providesTags: ['UserInfo'],
    }),

    updateUserInfo: build.mutation<null, IUserInfo>({
      async queryFn(arg: IUserInfo) {
        try {
          const db = getDatabase();
          await set(ref(db, '/userInfo'), {
            ...arg,
          });
          return { data: null, isError: false };
        } catch (err) {
          return { data: null, isError: true };
        }
      },
      invalidatesTags: ['UserInfo'],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetUserInfoQuery,
  useUpdateUserInfoMutation,
} = queryApi;
