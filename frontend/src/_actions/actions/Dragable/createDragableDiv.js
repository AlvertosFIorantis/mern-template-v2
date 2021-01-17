import axios from "axios";
import {
  DRAGABLEDIV_FAILED,
  CREATE_DRAGABLE_DIV,
} from "../../constants/DragableConstants/dragable_constants";

// an kapia fora den vlepo na dimiourgit item me to modal einai giati vazo mikro onoma sto project kai den exo kanei setup na pernei error otan simveni afto gia na dimiourgiso item thelo toulaxisotn 6 characters long name

export const createdragablediv = (dataFromComponent) => async (dispatch) => {
  // edo vazo to logic pou thelo na ekteleite sto async request gia paradigma an thelo na alakso kati apo ta data pou perno apo to api peso ti gia pradigma ot iperno kati data apo to backend kai thelo na ta peraso san payload gia paradgiam exo token apo to logged in user
  try {
    const responseData = await axios({
      method: "POST",
      url: "http://localhost:5000/api/dragabledivs/createdragablediv",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.token,
      },
    });
    // otan telioso oti thelo na kano pali kano return to object opos exo kai sta apla action apla i idiafora tora einai oti adi gia return object exo dispatch to object
    console.log(responseData.data);
    dispatch({
      type: CREATE_DRAGABLE_DIV,
      // boro na peraso san payload pragmata pou perno apo to backend
      payload: responseData.data,
    });
  } catch (err) {
    console.log("my dragablediv error:...", err);
    dispatch({
      type: DRAGABLEDIV_FAILED,
      // boro na peraso san payload pragmata pou perno apo to backend
      payload: err.response.data,
    });
  }
};
