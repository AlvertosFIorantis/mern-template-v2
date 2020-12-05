import {
  GET_MY_PROJECTS,
  PROJECTS_FAILED,
  CREATE_PROJECT,
  DELETE_PROJECT,
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
    case DELETE_PROJECT:
      return {
        ...state,
        // otan thelo na kano spread to nested array den boro na kano ... projects giati den ksero ti eian ito projects prepei na kano ...state.projects
        projects: [
          // to project_id pou ex osto payload einai afto pou vazo san onoma sto action kai to project._id pou exo meta to => einai san otan exo to map function to kathe project meta to => einai ena itme apo to array kai to kathe item tou array einai ousiastiak ena object pou exei property _id afto boro na to do kai sto redux store kai oustika thelo na giriso ola ta imtes tou array pou to _id tous den einai to id pou exo perasi afto pou einai simaidko einia oti edo prepei na valo kapio logic giati apo to frontend ta affero apo to array ala den ksero an odos eginan delete sto backend bori na xriasto na valo ena spinner kai mono an paro thetiko minima apo to backend oti odos diagrafikan na ta aferaso apo edo
          ...state.projects.filter(
            (project) => project._id !== action.payload.project_id
          ),
        ],
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
