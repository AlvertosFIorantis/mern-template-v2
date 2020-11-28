import SignupLoginForm from "./SignupLoginForm";
// to componetn pou theloume na kanoume test
import { mount } from "enzyme";
import { shallow } from "enzyme";
import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import { LOGIN_USER } from "../../_actions/constants/UsersConstants/user_constants";

// xxxxxxxxxxx Helper functionxxxxxxxxxxx
const findByTestAtrr = (component, attr) => {
  const wrapper = component.find(`[data-test='${attr}']`);
  return wrapper;
  // pernao 2 arugmetns se afto to function to componet kai pio data-test attribue apo afto to compoent thelo na vro adi gia aparaadigma na xrisimopio to css class pou epsaxna prin
};

//xxxxxxxxxxx Helper function
import { applyMiddleware, createStore } from "redux";
import RootReducer from "../../_reducers";
import { middlewares } from "../../createStore";
const testStore = (initialState) => {
  // opote ftaixn ousitaka ena neo store akrivso me to idio tropo pou ftiaxno to kanoniko mou redux store sto createStore.js kai apla afto to store eiani to store pou tha xrisimopiso sta tests mou
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(
    createStore
  );
  return createStoreWithMiddleware(RootReducer, initialState);
};
// XXXXXXXXXXXXXXXXXXX Helper functions xxxxxxxxxxxxxx
// dimourgo to inital stae mou gia to redux
const setUp = (initialState = {}) => {
  // dimiourgo to test redux store
  const store = testStore(initialState);
  // sto wrapper pernao to componetne pou thelo na kano test kai epidi afto einai connected component kai prepei na exi access sto test redux store perno to props store ={store}
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <SignupLoginForm />
      </MemoryRouter>
    </Provider>
  );
  return wrapper;
  // tin idea gia to pos na kano define to connected compont to virsko apo edo pera
  // https://stackoverflow.com/questions/55579262/testing-connected-components-with-enzyme
};

//edo ksekinaio ta tests apla
describe("SignupLoginForm Component", () => {
  let wrapper;
  let store;
  // diimourgo tu dummy data mou gia to inital store kai genika kano to let wrapper ost mesa sto before each na trekso to setup function pou eftiaksa apo pano oste na dimirigos to wrapper
  beforeEach(() => {
    const initialState = {
      user: {
        token: null,
        errorMessage: null,
        userId: null,
        first_login_verify: false,
        image: null,
      },
    };
    // edo xrisimoipio to helper function mou
    wrapper = setUp(initialState);
    store = testStore(initialState);
  });

  // ena poli aplo test gia na do oti ginete render  kai apla vlepo opos kai sta ala tests mou oti exei lenght 1 ara ipraxei an evaza 0 itan na tekaro an den iparxei
  it("Should render without errors", () => {
    const component = findByTestAtrr(wrapper, "SignupLoginForm");
    expect(component.length).toBe(1);
  });
  // alo test pou thelo na trekso vazo async giati perimeno gia to api call pou trexei otan ektelo to function apo to component
  it("Update the token in redux store after successfully completing an API call and making sure that the mapStateToPRops that i have for the token gets actually updated", async () => {
    store.dispatch({
      type: LOGIN_USER,
      // boro na peraso san payload pragmata pou perno apo to backend
      payload: {
        token: 123,
        userId: 123,
        image: "pathToImage",
      },
    });
    // kano dispatch to action pou exo mesa sto function pou ekteleite sto componet gia to login ala oustiak pao kateftian kai ektlo to dispatch pou exo sto login action gia na min exo na trexo alo function
    const wrapperTest = shallow(<SignupLoginForm store={store} />);
    console.log("wrapper...", wrapperTest.dive().props().token);
    expect(wrapperTest.dive().props().token).toBe(123);
  });
  // example pou akolouthisa se sindiamo me to apo pano link https://stackoverflow.com/questions/51943248/react-redux-testing-mapstatetoprops-and-mapdispatchtoprops-with-enzyme-jest
});
