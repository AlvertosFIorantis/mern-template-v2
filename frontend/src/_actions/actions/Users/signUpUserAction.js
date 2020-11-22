import axios from 'axios'
import {SIGNUP_USER,AUTH_FAILED} from "../../constants/UsersConstants/user_constants"

//pernao 2 argument sto fucntion to ena einai ta data kai to alo to history oste otan einai eptixies to action na boro na kano to user redirect
export const signUpUserAction = (dataFromComponent, history) => async (
  dispatch,
  getState,
) => {
  // edo vazo to logic pou thelo na ekteleite sto async request gia paradigma an thelo na alakso kati apo ta data pou perno apo to api peso ti gia pradigma ot iperno kati data apo to backend kai thelo na ta peraso san payload gia paradgiam exo token apo to logged in user
  try {
    const responseData = await axios({
      method: 'POST',
      url: 'http://localhost:5000/api/users/signup',
      headers: {
        'Content-Type': 'application/json',
      },
      data: dataFromComponent,
    })
    // otan telioso oti thelo na kano pali kano return to object opos exo kai sta apla action apla i idiafora tora einai oti adi gia return object exo dispatch to object

    dispatch({
      type: SIGNUP_USER,
      // boro na peraso san payload pragmata pou perno apo to backend
      payload: responseData.data,
    })
    // Save token on the localstorage as well !!
    if (responseData.data.token) {
      localStorage.setItem('token', responseData.data.token)
    }
    console.log('recieved data from backend')
    history.push('/home')
  } catch (err) {
    console.log(err)
    dispatch({
      type: AUTH_FAILED,
      // boro na peraso san payload pragmata pou perno apo to backend
      payload: err.response.data,
    })
    console.log('some error from backend')
  }
}