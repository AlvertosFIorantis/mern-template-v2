import { combineReducers } from "redux";
import user from "./user_reducer";
import project from "./project_reducer";
import chartSummary from "./chartSummary_reducer";

const RootReducer = combineReducers({
  user: user,
  project: project,
  chartSummary: chartSummary,
});

export default RootReducer;
