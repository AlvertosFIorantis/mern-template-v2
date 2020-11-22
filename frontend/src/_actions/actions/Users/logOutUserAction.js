import {LOGOUT_USER} from "../../constants/UsersConstants/user_constants"

export const logOutUserAction = (history) => async (dispatch, getState) => {
  dispatch({
    type: LOGOUT_USER,
    // boro na peraso san payload pragmata pou perno apo to backend
    payload: null,
  })
  // clear data from local storage
  localStorage.removeItem('token')
  history.push('/')
}