import {
  GET_STATS_GROUP_BY_STATUS,
  CHARTS_FAILED,
} from "../_actions/constants/ChartSummaryConstants/ChartSummaryConstants";

// prepei pada na exo ena initial state
const initialState = {
  statsGroupyByStatus: [],
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_STATS_GROUP_BY_STATUS:
      return {
        ...state,
        statsGroupyByStatus: action.payload.projects,
      };
    case CHARTS_FAILED:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      console.log("Chart Summary reducer");
      return state;
  }
}
