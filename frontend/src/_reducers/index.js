import { combineReducers } from "redux";
import user from "./user_reducer";
import project from "./project_reducer";

const RootReducer = combineReducers({
  user: user,
  project: project,
});

export default RootReducer;
