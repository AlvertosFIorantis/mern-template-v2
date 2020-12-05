import axios from "axios";
import {
  GET_MY_PROJECTS,
  PROJECTS_FAILED,
} from "../../constants/ProjectConstants/project_constants";

export const GetMyProjects = () => async (dispatch) => {
  try {
    const responseData = await axios({
      method: "GET",
      url: "http://localhost:5000/api/projects/myprojects",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.token,
      },
    });
    // otan telioso oti thelo na kano pali kano return to object opos exo kai sta apla action apla i idiafora tora einai oti adi gia return object exo dispatch to object
    console.log("Response Data GET_MY_PROJECTS:....", responseData.data);
    dispatch({
      type: GET_MY_PROJECTS,
      // boro na peraso san payload pragmata pou perno apo to backend
      payload: { ...responseData.data },
    });
    // Save token on the localstorage as well !!
  } catch (err) {
    console.log("my projects error:...", err);
    dispatch({
      type: PROJECTS_FAILED,
      // boro na peraso san payload pragmata pou perno apo to backend
      payload: err.response.data,
    });
  }
};
