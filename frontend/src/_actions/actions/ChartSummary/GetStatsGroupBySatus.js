import {
  GET_STATS_GROUP_BY_STATUS,
  CHARTS_FAILED,
} from "../../constants/ChartSummaryConstants/ChartSummaryConstants";
import axios from "axios";

export const GetStatsGroupByStatus = () => async (dispatch) => {
  try {
    const responseData = await axios({
      method: "GET",
      url: "http://localhost:5000/api/projects/statsGroupyByStatus",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.token,
      },
    });
    // otan telioso oti thelo na kano pali kano return to object opos exo kai sta apla action apla i idiafora tora einai oti adi gia return object exo dispatch to object
    console.log(
      "Response Data GET_STATS_GROUP_BY_STATUS:....",
      responseData.data
    );
    dispatch({
      type: GET_STATS_GROUP_BY_STATUS,
      // boro na peraso san payload pragmata pou perno apo to backend
      payload: { ...responseData.data },
    });
    // Save token on the localstorage as well !!
  } catch (err) {
    console.log("my GET_STATS_GROUP_BY_STATUS error:...", err);
    dispatch({
      type: CHARTS_FAILED,
      // boro na peraso san payload pragmata pou perno apo to backend
      payload: err.response.data,
    });
  }
};
