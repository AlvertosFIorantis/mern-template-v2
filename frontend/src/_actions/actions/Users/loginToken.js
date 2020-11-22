import axios from 'axios'
import {LOGIN_USER,AUTH_FAILED} from "../../constants/UsersConstants/user_constants"

export const loginToken = (history) => async (dispatch) => {
  console.log('history')
  // edo vazo to logic pou thelo na ekteleite sto async request gia paradigma an thelo na alakso kati apo ta data pou perno apo to api peso ti gia pradigma ot iperno kati data apo to backend kai thelo na ta peraso san payload gia paradgiam exo token apo to logged in user
  try {
    const responseData = await axios({
      method: 'GET',
      url: 'http://localhost:5000/api/users/verify',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.token,
      },
    })
    // otan telioso oti thelo na kano pali kano return to object opos exo kai sta apla action apla i idiafora tora einai oti adi gia return object exo dispatch to object

    dispatch({
      type: LOGIN_USER,
      // boro na peraso san payload pragmata pou perno apo to backend
      payload: { ...responseData.data, first_login_verify: true },
    })
    // Save token on the localstorage as well !!
    if (responseData.data.token) {
      localStorage.setItem('token', responseData.data.token)
    }
    history.push('/home')
  } catch (err) {
    console.log('hii')
    dispatch({
      type: AUTH_FAILED,
      // boro na peraso san payload pragmata pou perno apo to backend
      payload: err.response.data,
    })
  }
}