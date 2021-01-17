import axios from "axios";
import {
  SAVE_DRAGABLEDIVS,
  DRAGABLEDIV_FAILED,
} from "../../constants/DragableConstants/dragable_constants";

export const saveDragableDivs = () => async (dispatch, getState) => {
  try {
    const updated_array = getState().Dragable.dragableDivs.map((div) => {
      let div1 = document.getElementById(`${div._id}`);
      let newDiv = {
        // to id to perno apo to proto div oxi apo to getelemetn id pou perno to x kai to Y
        _id: div._id,
        XCoordinates: `${div1.offsetLeft}`,
        YCoordinates: `${div1.offsetTop}`,
      };
      return newDiv;
    });
    console.log("DIVSSSSSSSSSSS", ...updated_array);
    dispatch({
      type: SAVE_DRAGABLEDIVS,
      // boro na peraso san payload pragmata pou perno apo to backend
      payload: [...updated_array],
    });
  } catch (err) {
    console.log("my projects error:...", err);
    dispatch({
      type: DRAGABLEDIV_FAILED,
      // boro na peraso san payload pragmata pou perno apo to backend
      payload: err.response.data,
    });
  }
};
