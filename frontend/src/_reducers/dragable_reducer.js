import {
  CREATE_DRAGABLE_DIV,
  DRAGABLEDIV_FAILED,
  GET_DRAGABLEDIVS,
  SAVE_DRAGABLEDIVS,
} from "../_actions/constants/DragableConstants/dragable_constants";

// prepei pada na exo ena initial state
const initialState = {
  dragableDivs: [],
  connectionArray: [],
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_DRAGABLE_DIV:
      // exo nested array mesa sto object
      return {
        ...state,
        dragableDivs: [...state.dragableDivs, action.payload.dragableDiv],
      };
    case GET_DRAGABLEDIVS:
      // exo nested array mesa sto object
      return {
        ...state,
        dragableDivs: [...action.payload.dragabledivs],
      };
    case SAVE_DRAGABLEDIVS:
      // exo nested array mesa sto object
      return {
        ...state,
        dragableDivs: [...action.payload],
      };
    case DRAGABLEDIV_FAILED:
      return {
        ...state,
        error: action.payload.error,
      };

    default:
      console.log("Dragable reducer");
      return state;
  }
}
