import Dashboard from "./Dashboard";
import { mount } from "enzyme";
import { shallow } from "enzyme";
import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import {
  GET_MY_PROJECTS,
  PROJECTS_FAILED,
  CREATE_PROJECT,
  DELETE_PROJECT,
} from "../../_actions/constants/ProjectConstants/project_constants";

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
        <Dashboard />
      </MemoryRouter>
    </Provider>
  );
  return wrapper;
  // tin idea gia to pos na kano define to connected compont to virsko apo edo pera
  // https://stackoverflow.com/questions/55579262/testing-connected-components-with-enzyme
};

//edo ksekinaio ta tests apla
describe("Dashboard Component", () => {
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
      chartSummary: {
        statsGroupyByStatus: [],
        error: "",
      },
      project: {
        projects: [],
        error: "",
      },
    };
    // edo xrisimoipio to helper function mou
    wrapper = setUp(initialState);
    store = testStore(initialState);
  });

  // ena poli aplo test gia na do oti ginete render  kai apla vlepo opos kai sta ala tests mou oti exei lenght 1 ara ipraxei an evaza 0 itan na tekaro an d  iparxei
  it("Should render without errors", () => {
    const component = findByTestAtrr(wrapper, "Dashboard");
    expect(component.length).toBeTruthy();
  });
  // alo test pou thelo na trekso vazo async giati perimeno gia to api call pou trexei otan ektelo to function apo to component
  it("Checking that i can get the list of token from the redux store", async () => {
    store.dispatch({
      type: GET_MY_PROJECTS,
      // boro na peraso san payload pragmata pou perno apo to backend
      payload: {
        projects: [
          {
            _id: "1",
            projectCategory: "internal-project",
          },
          {
            _id: "2",
            projectCategory: "internal-project",
          },
        ],
      },
    });
    // kano dispatch to action pou exo mesa sto function pou ekteleite sto componet gia to login ala oustiak pao kateftian kai ektlo to dispatch pou exo sto login action gia na min exo na trexo alo function
    const wrapperTest = shallow(<Dashboard store={store} />);
    // console.log("wrapper... Dashboard", wrapperTest.dive().props());
    // den boro na valo toBe giati kano comparison metaksi arrays
    expect(wrapperTest.dive().props().projects).toStrictEqual([
      {
        _id: "1",
        projectCategory: "internal-project",
      },
      {
        _id: "2",
        projectCategory: "internal-project",
      },
    ]);
  });
  // example pou akolouthisa se sindiamo me to apo pano link https://stackoverflow.com/questions/51943248/react-redux-testing-mapstatetoprops-and-mapdispatchtoprops-with-enzyme-jest
  // alo test pou thelo na trekso vazo async giati perimeno gia to api call pou trexei otan ektelo to function apo to component
  it("Check that i create a project in the redux store", async () => {
    store.dispatch({
      type: CREATE_PROJECT,
      // boro na peraso san payload pragmata pou perno apo to backend
      payload: {
        project: {
          _id: "1",
          projectCategory: "internal-project",
        },
      },
    });
    // kano dispatch to action pou exo mesa sto function pou ekteleite sto componet gia to login ala oustiak pao kateftian kai ektlo to dispatch pou exo sto login action gia na min exo na trexo alo function
    const wrapperTest = shallow(<Dashboard store={store} />);
    // console.log("wrapper... Dashboard", wrapperTest.dive().props());
    // den boro na valo toBe giati kano comparison metaksi arrays
    expect(wrapperTest.dive().props().projects).toStrictEqual([
      { _id: "1", projectCategory: "internal-project" },
    ]);
  });
  // example pou akolouthisa se sindiamo me to apo pano link https://stackoverflow.com/questions/51943248/react-redux-testing-mapstatetoprops-and-mapdispatchtoprops-with-enzyme-jest
  it("Check that i delete a project in the redux store", async () => {
    store.dispatch({
      type: DELETE_PROJECT,
      // boro na peraso san payload pragmata pou perno apo to backend
      payload: {
        project: {
          _id: "1",
          projectCategory: "internal-project",
        },
      },
    });
    // kano dispatch to action pou exo mesa sto function pou ekteleite sto componet gia to login ala oustiak pao kateftian kai ektlo to dispatch pou exo sto login action gia na min exo na trexo alo function
    const wrapperTest = shallow(<Dashboard store={store} />);
    // console.log("wrapper... Dashboard", wrapperTest.dive().props());
    // den boro na valo toBe giati kano comparison metaksi arrays
    // NOTE !!!!!!!!!! KAnonika edo that eprepe sto arxiko store na exo ena proejct kai afto to proejct na to kano delete meta edo pera ala gia na to kano afto simien oti afto to project prepei na prostheso se oles tis apadiss pou exo sta ala tests apo pano
    expect(wrapperTest.dive().props().projects).toStrictEqual([]);
  });
  // example pou akolouthisa se sindiamo me to apo pano link https://stackoverflow.com/questions/51943248/react-redux-testing-mapstatetoprops-and-mapdispatchtoprops-with-enzyme-jest
});
