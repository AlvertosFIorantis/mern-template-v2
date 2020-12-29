import {
  GET_STATS_GROUP_BY_STATUS,
  CHARTS_FAILED,
} from "../_actions/constants/ChartSummaryConstants/ChartSummaryConstants";

import chartSummary from "./chartSummary_reducer";

// vazo opos padad to descirble gia na enkisgiso ti tests thelo na trekso ekie mesa me. To kathe test to trexo mesa se ena it statement
describe("Chart Reducer", () => {
  it("Should return default state", () => {
    // gia na kano test an tha mou giriso deflaut stat afto pou exo na kano einai  na stilo ena action pou den iparxei afto gia afto vazo to undefined. Opote ousiastika to post reducer eiani o reducer pou thelo na tsekaor kai apal tou vazo to undefineid einai to inital state tou reducer  kai to {} san adio payload kai to action pou thelo. Apla epidi exo adio {} den exo perasi oute action oute payload
    // POLI SIMADIKO STO user_reducer.js to initial state mou einai to object pou exo apo kano me token:null,errorMessage:null,userId:null,first_login_verify:false opote an den exo action pou kanei match sto reducer mou thelo na mou kanie retunr to default state
    const newState = chartSummary(undefined, {});
    expect(newState).toEqual({ statsGroupyByStatus: [], error: "" });
  });
  it("Should return new state if receiving action type of   GET_STATS_GROUP_BY_STATUS", () => {
    const initialState = { statsGroupyByStatus: [], error: "" };

    const data = {
      projects: [
        {
          _id: "in-work",
          count: 2,
        },
        {
          _id: "published",
          count: 4,
        },
      ],
    };
    const newState = chartSummary(initialState, {
      type: GET_STATS_GROUP_BY_STATUS,
      payload: data,
    });
    expect(newState).toEqual({
      statsGroupyByStatus: [
        {
          _id: "in-work",
          count: 2,
        },
        {
          _id: "published",
          count: 4,
        },
      ],
      error: "",
    });
  });
});
