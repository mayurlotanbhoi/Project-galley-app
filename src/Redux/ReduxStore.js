import { configureStore } from "@reduxjs/toolkit";
import userSlicer from "./Slicers/GetUserSlicer";
import ProjectUpDate from "./Slicers/ProjectIpdate";

const store = configureStore({
  reducer: {
    user: userSlicer,
    projectUpdate: ProjectUpDate,
  },
});

export default store;
