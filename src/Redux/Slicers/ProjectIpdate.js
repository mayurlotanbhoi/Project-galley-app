import { createSlice } from "@reduxjs/toolkit";

const ProjectUpdate = createSlice({
  name: "projectUpdate",
  initialState: {
    projectData: {},
  },

  reducers: {
    updateProject(state, action) {
      state.projectData = action.payload;
    },
  },
});

export default ProjectUpdate.reducer;

export const { updateProject } = ProjectUpdate.actions;
