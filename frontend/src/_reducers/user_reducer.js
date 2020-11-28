import {
  LOGIN_USER,
  SIGNUP_USER,
  AUTH_FAILED,
  SIGNUP_USER_IMAGE,
  LOGOUT_USER,
} from "../_actions/constants/UsersConstants/user_constants";

// prepei pada na exo ena initial state
const initialState = {
  token: null,
  errorMessage: null,
  userId: null,
  first_login_verify: false,
  image: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SIGNUP_USER:
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
      };
    case SIGNUP_USER_IMAGE:
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
        image: action.payload.image,
        // na vevotho oti to backend odos steleni to image !!!! den nomizo na to exo kanie implement
      };
    case LOGIN_USER:
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
        image: action.payload.image,
      };

    case AUTH_FAILED:
      return { ...state, errorMessage: action.payload.message };
    case LOGOUT_USER:
      return { ...state, token: action.payload };
    default:
      console.log("reducer");
      return state;
  }
}
