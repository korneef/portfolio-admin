import { get } from 'firebase/database';

import { queryApi } from '../../../app/store/slices/queryApi';
import { projectRef } from '../../../app/firebase/firebase';

import IProject from '../../../models/projectModel';

const api = queryApi.injectEndpoints({
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
              tags: childData.tags ? childData.tags : [],
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
  }),
});

export default api.useGetProjectsQuery;
