import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  child, get, getDatabase, push, ref, set,
} from 'firebase/database';
import { dbRef, projectRef } from '../../firebase/firebase';
import IUserInfo from '../../../models/userInfoModel';
import IProject from '../../../models/projectModel';

// TODO endpoints also should return errors
export const queryApi = createApi({
  baseQuery: fakeBaseQuery(),
  tagTypes: ['UserInfo', 'Projects'],
  endpoints: (build) => ({
    getProjects: build.query({
      async queryFn() {
        try {
          const data: Array<IProject> = [];
          const snapshot = await get(projectRef);
          snapshot.forEach((childSnapshot) => {
            const childKey = childSnapshot.key;
            const childData = childSnapshot.val();
            data.push({
              ...childData,
              id: childKey,
              tags: [],
            });
          });
          return { data, isError: false };
        } catch (error) {
          console.log(error);
          return { data: [], isError: true };
        }
      },
      providesTags: ['Projects'],
    }),

    createProject: build.mutation<null, IProject>({
      async queryFn(arg: IProject) {
        try {
          const newProjectRef = await push(projectRef);
          await set(newProjectRef, { ...arg });
          return { data: null, isError: false, isLoading: false };
        } catch (err) {
          return { data: null, isError: true, isLoading: false };
        }
      },
      invalidatesTags: ['Projects'],
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
  useCreateProjectMutation,
} = queryApi;
