import { GET_STATS_GROUP_BY_STATUS } from "../../_actions/constants/ChartSummaryConstants/ChartSummaryConstants";
import ChartSummary from "./ChartSummary";
import { mount } from "enzyme";
import { shallow } from "enzyme";
import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";

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
        <ChartSummary />
      </MemoryRouter>
    </Provider>
  );
  return wrapper;
  // tin idea gia to pos na kano define to connected compont to virsko apo edo pera
  // https://stackoverflow.com/questions/55579262/testing-connected-components-with-enzyme
};

//edo ksekinaio ta tests apla
describe("ChartSummary Component", () => {
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
    };
    // edo xrisimoipio to helper function mou
    wrapper = setUp(initialState);
    store = testStore(initialState);
  });

  // ena poli aplo test gia na do oti ginete render  kai apla vlepo opos kai sta ala tests mou oti exei lenght 1 ara ipraxei an evaza 0 itan na tekaro an d  iparxei
  it("Should render without errors", () => {
    const component = findByTestAtrr(wrapper, "ChartSummary");
    expect(component.length).toBeTruthy();
  });
  // alo test pou thelo na trekso vazo async giati perimeno gia to api call pou trexei otan ektelo to function apo to component
  it("Check that i ma getting the right payload when the action executes that creates the charts based on the data i am getting from the backend", async () => {
    store.dispatch({
      type: GET_STATS_GROUP_BY_STATUS,
      // boro na peraso san payload pragmata pou perno apo to backend
      payload: {
        projects: [
          {
            _id: "in-work",
            count: 2,
          },
          {
            _id: "published",
            count: 4,
          },
        ],
      },
    });
    // kano dispatch to action pou exo mesa sto function pou ekteleite sto componet gia to login ala oustiak pao kateftian kai ektlo to dispatch pou exo sto login action gia na min exo na trexo alo function
    const wrapperTest = shallow(<ChartSummary store={store} />);
    // console.log(
    //   "wrapper... ChartSummmary",
    //   wrapperTest.dive().props().GetStatsGroupByStatusData
    // );
    // den boro na valo toBe giati kano comparison metaksi arrays
    expect(wrapperTest.dive().props().GetStatsGroupByStatusData).toStrictEqual([
      {
        _id: "in-work",
        count: 2,
      },
      {
        _id: "published",
        count: 4,
      },
    ]);
  });
  // example pou akolouthisa se sindiamo me to apo pano link https://stackoverflow.com/questions/51943248/react-redux-testing-mapstatetoprops-and-mapdispatchtoprops-with-enzyme-jest
});
