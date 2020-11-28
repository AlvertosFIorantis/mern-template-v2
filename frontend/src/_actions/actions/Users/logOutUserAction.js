import { LOGOUT_USER } from "../../constants/UsersConstants/user_constants";

export const logOutUserAction = (history) => async (dispatch, getState) => {
  dispatch({
    type: LOGOUT_USER,
    // boro na peraso san payload pragmata pou perno apo to backend
    payload: null,
    // bomizo oti se afto to action den exei logiki pou girnao to payload !ara malon kalitera na to vgalo
  });
  // clear data from local storage
  localStorage.removeItem("token");
  history.push("/");
};
