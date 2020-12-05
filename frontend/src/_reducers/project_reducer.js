import {
  GET_MY_PROJECTS,
  PROJECTS_FAILED,
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
