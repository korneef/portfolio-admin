import {
  child, get, ref, set,
} from 'firebase/database';
import { queryApi } from './queryApi';
import {
  db, dbRef, getDownloadURL, storage, storageRef, uploadString,
} from '../../firebase/firebase';
import IUserInfo from '../../../models/userInfoModel';

const userInfoApi = queryApi.injectEndpoints({
  endpoints: (build) => ({
    getUserInfo: build.query({
      async queryFn() {
        try {
          const userImageRef = storageRef(storage, 'user/userImage.jpg');

          const image = await getDownloadURL(userImageRef)
            .then((url) => fetch(url))
            .then((res) => res.blob())
            .then((blob) => URL.createObjectURL(blob))
            .catch((err) => {
              console.log(err);
              return null;
            });
          console.log(image);
          const snapshot = await get(child(dbRef, '/userInfo'));
          if (snapshot.exists()) {
            // return { data: snapshot.val() as IUserInfo, isError: false };
            return {
              data: {
                user: snapshot.val() as IUserInfo,
                userImage: image,
              },
              isError: false,
            };
          }
          return { data: null, isError: false };
        } catch (error) {
          return { data: null, isError: true };
        }
      },
      providesTags: ['UserInfo'],
    }),

    updateUserInfo: build.mutation({
      async queryFn(arg: [IUserInfo, string]) {
        const [user, userImage] = arg;
        try {
          await set(ref(db, '/userInfo'), {
            ...user,
          });
          const userImageRef = storageRef(storage, 'user/userImage.jpg');
          await uploadString(userImageRef, userImage, 'data_url');
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
