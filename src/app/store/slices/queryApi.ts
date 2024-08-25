import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  child, get, push, ref, set, update, remove,
} from 'firebase/database';
import {
  db,
  dbRef,
  tagsRef,
  projectRef,
  storage,
  storageRef,
  uploadString,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from '../../firebase/firebase';
import IProject from '../../../models/projectModel';

// TODO endpoints also should return errors
export const queryApi = createApi({
  baseQuery: fakeBaseQuery(),
  tagTypes: ['UserInfo', 'Projects', 'OneProject', 'Tags', 'CV'],
  endpoints: (build) => ({

    // Endpoints for PROJECTS

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

    getOneProject: build.query({
      async queryFn(projectId: string) {
        try {
          const snapshot = await get(child(dbRef, `projects/${projectId}`));
          const projectImageRef = storageRef(storage, `projects/${projectId}/projectImage.jpg`);

          const image = await getDownloadURL(projectImageRef)
            .then((url) => fetch(url))
            .then((res) => res.blob())
            .then((blob) => URL.createObjectURL(blob))
            .catch((err) => {
              console.log(err);
              return null;
            });

          if (snapshot.exists()) {
            return {
              data: {
                project: snapshot.val(),
                image,
              },
              isError: false,
            };
          }
          return { data: null, isError: false };
        } catch (e) {
          return { data: null, isError: true };
        }
      },
      providesTags: ['Projects'],
    }),

    createProject: build.mutation({
      async queryFn(arg: [IProject, string]) {
        const [project, projectImage] = arg;
        try {
          const newProjectRef = await push(projectRef);

          const projectImageRef = storageRef(
            storage,
            `projects/${newProjectRef.key}/projectImage.jpg`,
          );

          await uploadString(projectImageRef, projectImage, 'data_url');

          await set(newProjectRef, { ...project });
          return { data: null, isError: false, isLoading: false };
        } catch (err) {
          return { data: null, isError: true, isLoading: false };
        }
      },
      invalidatesTags: ['Projects'],
    }),

    updateProject: build.mutation({
      async queryFn(arg: [string, IProject, string]) {
        const [projectId, project, projectImage] = arg;
        const projectsRef = ref(db, '/projects');
        const projectImageRef = storageRef(storage, `projects/${projectId}/projectImage.jpg`);
        try {
          // const newTagRef = await push(tagsRef);
          await update(projectsRef, { [projectId]: project });
          await uploadString(projectImageRef, projectImage, 'data_url');

          return { data: null, isError: false };
        } catch (e) {
          return { data: null, isError: true };
        }
      },
      invalidatesTags: ['Projects', 'OneProject'],
    }),

    // Endpoints for TAGS

    getTags: build.query({
      async queryFn() {
        try {
          const data: Array<{ tag: string, id: string }> = [];
          const snapshot = await get(tagsRef);
          snapshot.forEach((childSnapshot) => {
            const childKey = childSnapshot.key;
            const childData = childSnapshot.val();
            data.push({ tag: childData, id: childKey });
          });
          return { data, isError: false };
        } catch (error) {
          return { data: [], isError: true };
        }
      },
      providesTags: ['Tags'],
    }),

    createTag: build.mutation({
      async queryFn(arg: string) {
        try {
          const newTagRef = await push(tagsRef);
          await set(newTagRef, arg);
          return { data: null, isError: false };
        } catch (e) {
          return { data: null, isError: true };
        }
      },
      invalidatesTags: ['Tags'],
    }),

    updateTag: build.mutation({
      // todo add type for these object
      async queryFn(arg: { key: string, data: string }) {
        try {
          // const newTagRef = await push(tagsRef);
          await update(tagsRef, { [arg.key]: arg.data });
          return { data: null, isError: false };
        } catch (e) {
          return { data: null, isError: true };
        }
      },
      invalidatesTags: ['Tags'],
    }),

    removeTag: build.mutation({
      // todo add type for these object
      async queryFn(arg: string) {
        try {
          const removeTagRef = await ref(db, `dictionaries/tags/${arg}`);
          await remove(removeTagRef);
          return { data: null, isError: false };
        } catch (e) {
          return { data: null, isError: true };
        }
      },
      invalidatesTags: ['Tags'],
    }),

    // CVes
    getCVurl: build.query({
      async queryFn(language: string) {
        try {
          const cvStorageRef = storageRef(storage, `CVs/${language}/Valentin_Korneev[frontend_developer].pdf`);
          const downloadURL = await getDownloadURL(cvStorageRef);
          return { data: downloadURL, isError: false, isLoading: false };
        } catch (e) {
          return { data: null, isError: true, isLoading: false };
        }
      },
      providesTags: ['CV'],
    }),

    uploadCV: build.mutation({
      async queryFn(arg: {
        file: Blob,
        language: 'ru' | 'en',
        name: string;
      }) {
        try {
          const cvStorageRef = storageRef(
            storage,
            `CVs/${arg.language}/${arg.name}.pdf`,
          );
          const newFile = await uploadBytes(cvStorageRef, arg.file);
          return { data: newFile.metadata.name, isError: false, isLoading: false };
        } catch (e) {
          return { data: null, isError: true, isLoading: false };
        }
      },
      invalidatesTags: ['CV'],
    }),

    deleteCV: build.mutation({
      async queryFn(arg: {
        language: 'ru' | 'en',
        name: string;
      }) {
        try {
          const cvStorageRef = storageRef(
            storage,
            `CVs/${arg.language}/${arg.name}.pdf`,
          );
          await deleteObject(cvStorageRef);
          return { data: true, isError: false, isLoading: false };
        } catch (e) {
          return { data: null, isError: true, isLoading: false };
        }
      },
      invalidatesTags: ['CV'],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetOneProjectQuery,
  useUpdateProjectMutation,
  useCreateProjectMutation,
  useGetTagsQuery,
  useCreateTagMutation,
  useUpdateTagMutation,
  useRemoveTagMutation,
  useUploadCVMutation,
  useGetCVurlQuery,
  useDeleteCVMutation,
} = queryApi;
