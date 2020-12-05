import { useEffect } from "react";
import {
  GET_MY_PROJECTS,
  PROJECTS_FAILED,
  CREATE_PROJECT,
} from "../_actions/constants/ProjectConstants/project_constants";

// prepei pada na exo ena initial state
const initialState = {
  projects: [],
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_MY_PROJECTS:
      return {
        ...state,
        projects: action.payload.projects,
      };
    case CREATE_PROJECT:
      return {
        ...state,
        // otan thelo na kano spread to nested array den boro na kano ... projects giati den ksero ti eian ito projects prepei na kano ...state.projects
        projects: [...state.projects, action.payload.project],
      };
    case PROJECTS_FAILED:
      return {
        ...state,
        error: action.payload.error,
      };

    default:
      console.log("Project reducer");
      return state;
  }
}
