import {
  LOGIN_USER,
  SIGNUP_USER,
  AUTH_FAILED,
  SIGNUP_USER_IMAGE,
  LOGOUT_USER,
} from "../_actions/constants/UsersConstants/user_constants";

import user from "./user_reducer";

// vazo opos padad to descirble gia na enkisgiso ti tests thelo na trekso ekie mesa me. To kathe test to trexo mesa se ena it statement
describe("User Reducer", () => {
  it("Should return default state", () => {
    // gia na kano test an tha mou giriso deflaut stat afto pou exo na kano einai  na stilo ena action pou den iparxei afto gia afto vazo to undefined. Opote ousiastika to post reducer eiani o reducer pou thelo na tsekaor kai apal tou vazo to undefineid einai to inital state tou reducer  kai to {} san adio payload kai to action pou thelo. Apla epidi exo adio {} den exo perasi oute action oute payload
    // POLI SIMADIKO STO user_reducer.js to initial state mou einai to object pou exo apo kano me token:null,errorMessage:null,userId:null,first_login_verify:false opote an den exo action pou kanei match sto reducer mou thelo na mou kanie retunr to default state
    const newState = user(undefined, {});
    expect(newState).toEqual({
      token: null,
      errorMessage: null,
      userId: null,
      first_login_verify: false,
      image: null,
    });
  });
  // thelo na tesakro oti an valo action pou iparxei na mou girisi to state vasi tis alagis pou tah ekane afto to aciton. opote ousitaka exo ena posts array pou eiani to payload kai o logos eiani oti to action pou exo fitaksi kanei reutn array me posts apo to api opote ftiaaxno dummy data gia na ta epraso sto payload. Kia meta sto new state ftiaxno ena actio npou kai to palyoad kai ta vazo mesa sto {} kai apla exo to undefineid san initial stata mou
  it("Should return new state if receiving action type of LOGIN_USER", () => {
    const initialState = {
      token: null,
      errorMessage: null,
      userId: null,
      first_login_verify: false,
      image: null,
    };
    const data = { token: 123, userId: 12313, image: undefined };
    const newState = user(initialState, {
      type: LOGIN_USER,
      payload: data,
    });
    expect(newState).toEqual({
      token: 123,
      errorMessage: null,
      userId: 12313,
      first_login_verify: false,
      image: undefined,
    });
    // opote tsakro an to stat mou eian iiso me to neo array pou perni meta to aciton moou pou eiani oustikai to paylaod tou action. Afto einai poli eukolo test giati oustiak exo poli aplo state gia afot to vazo undefiens giati se kateh test kano elexo gia to pos epierazaete to state meta to action opote thelo na do mono to komati tou state pou epirazete apo to action
  });
  it("Should return new state if receiving action type of SIGNUP_USER", () => {
    const initialState = {
      token: null,
      errorMessage: null,
      userId: null,
      first_login_verify: false,
      image: null,
    };
    const data = { token: 123, userId: 12313 };
    const newState = user(initialState, {
      type: SIGNUP_USER,
      payload: data,
    });
    expect(newState).toEqual({
      token: 123,
      errorMessage: null,
      userId: 12313,
      first_login_verify: false,
      image: null,
    });
    // opote tsakro an to stat mou eian iiso me to neo array pou perni meta to aciton moou pou eiani oustikai to paylaod tou action. Afto einai poli eukolo test giati oustiak exo poli aplo state gia afot to vazo undefiens giati se kateh test kano elexo gia to pos epierazaete to state meta to action opote thelo na do mono to komati tou state pou epirazete apo to action
  });
  it("Should return new state if receiving action type of AUTH_FAILED", () => {
    const initialState = {
      token: null,
      errorMessage: null,
      userId: null,
      first_login_verify: false,
      image: null,
    };
    const data = { message: "not aunteticated" };
    const newState = user(initialState, {
      type: AUTH_FAILED,
      payload: data,
    });
    expect(newState).toEqual({
      token: null,
      errorMessage: "not aunteticated",
      userId: null,
      first_login_verify: false,
      image: null,
    });
    // opote tsakro an to stat mou eian iiso me to neo array pou perni meta to aciton moou pou eiani oustikai to paylaod tou action. Afto einai poli eukolo test giati oustiak exo poli aplo state gia afot to vazo undefiens giati se kateh test kano elexo gia to pos epierazaete to state meta to action opote thelo na do mono to komati tou state pou epirazete apo to action
  });
  it("Should return new state if receiving action type of SIGNUP_USER_IMAGE", () => {
    const initialState = {
      token: null,
      errorMessage: null,
      userId: null,
      first_login_verify: false,
      image: null,
    };
    const data = { token: 123, userId: 12313, image: "adada" };
    const newState = user(initialState, {
      type: SIGNUP_USER_IMAGE,
      payload: data,
    });
    expect(newState).toEqual({
      token: 123,
      errorMessage: null,
      userId: 12313,
      first_login_verify: false,
      image: "adada",
    });
    // opote tsakro an to stat mou eian iiso me to neo array pou perni meta to aciton moou pou eiani oustikai to paylaod tou action. Afto einai poli eukolo test giati oustiak exo poli aplo state gia afot to vazo undefiens giati se kateh test kano elexo gia to pos epierazaete to state meta to action opote thelo na do mono to komati tou state pou epirazete apo to action
  });
  it("Should return new state if receiving action type of LOGOUT_USER", () => {
    const initialState = {
      token: null,
      errorMessage: null,
      userId: null,
      first_login_verify: false,
      image: null,
    };

    const newState = user(initialState, {
      type: LOGOUT_USER,
    });
    expect(newState).toEqual({
      token: undefined,
      errorMessage: null,
      userId: null,
      first_login_verify: false,
      image: null,
    });
    // opote tsakro an to stat mou eian iiso me to neo array pou perni meta to aciton moou pou eiani oustikai to paylaod tou action. Afto einai poli eukolo test giati oustiak exo poli aplo state gia afot to vazo undefiens giati se kateh test kano elexo gia to pos epierazaete to state meta to action opote thelo na do mono to komati tou state pou epirazete apo to action
  });
});
