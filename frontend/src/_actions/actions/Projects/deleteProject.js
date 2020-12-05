import axios from "axios";
import {
  PROJECTS_FAILED,
  DELETE_PROJECT,
} from "../../constants/ProjectConstants/project_constants";

// to project id einai afot pou perno apo to componente pou ektelo to action edo pera to onomazo project_id ala boro na evaza oti ithela
export const deleteProject = (project_id) => async (dispatch) => {
  // edo vazo to logic pou thelo na ekteleite sto async request gia paradigma an thelo na alakso kati apo ta data pou perno apo to api peso ti gia pradigma ot iperno kati data apo to backend kai thelo na ta peraso san payload gia paradgiam exo token apo to logged in user
  try {
    const responseData = await axios({
      method: "GET",
      url: `http://localhost:5000/api/projects/project/${project_id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.token,
      },
    });

    console.log(responseData.data);
    dispatch({
      type: DELETE_PROJECT,
      // edo den thelo na stilo piso ta data pou perno apo to backend giati opos einai mexri stimgis den stelno piso tiptoa afot pou thelo einai na stilo sto reducer to project_id kai na to afereso apo to array me ola ta projects afto vevea borei na xriasti na alaksi sna logic giati afti ti stigmi den ksero opos exei i katastai an to project odos diagraftike sto backend ala ego pao kai to diagrafo apo to fronted kai afto eiani kakok user expirience, Malon prepi na vazzo ena spinner kai meta na ektelo to action mono an eimai 100% sigouros oti to project odos diagraftike apo to bakcend . SIMADIKO !!!!!!!!!!!!!!!!! to project_id pou vazo edo perai einai afto pou psaxno sto reducer me to action.payload.project_id
      payload: project_id,
    });
  } catch (err) {
    console.log("my projects error:...", err);
    dispatch({
      type: PROJECTS_FAILED,
      // boro na peraso san payload pragmata pou perno apo to backend
      payload: err.response.data,
    });
  }
};
