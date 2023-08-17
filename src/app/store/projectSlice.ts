/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type ProjectModel from '../../models/projectModel';

interface CounterState {
  projects: Array<ProjectModel>
}

const initialState: CounterState = {
  projects: [],
};

export const projectsSlice = createSlice({
  name: 'projects',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    loadProjects: (state, action: PayloadAction<Array<ProjectModel>>) => {
      state.projects = action.payload;
    },
  },
});

export const
  // TODO delete eslint rule below
  // eslint-disable-next-line no-empty-pattern
  {
  } = projectsSlice.actions;

export default projectsSlice.reducer;
