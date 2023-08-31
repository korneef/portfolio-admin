import { queryApi } from './queryApi';
import {
  child, get, ref, set,
} from 'firebase/database';
import { db, dbRef } from '../../firebase/firebase';
import IUserInfo from '../../../models/userInfoModel';

const userInfoApi = queryApi.injectEndpoints({
  endpoints: (build) => ({
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
          await set(ref(db, '/userInfo'), {
            ...arg,
          });
          return { data: null, isError: false };
        } catch (err) {
          return { data: null, isError: false };
        }
      },
      invalidatesTags: ['UserInfo'],
    }),
  }),
});

export const {
  useGetUserInfoQuery,
  useUpdateUserInfoMutation,
} = userInfoApi;
