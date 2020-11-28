import moxios from "moxios";
import { signUpUserAction } from "../_actions/actions/Users/signUpUserAction";

//xxxxxxxxxxx Helper function
import { applyMiddleware, createStore } from "redux";
import RootReducer from "../_reducers";
import { middlewares } from "../createStore";
const testStore = (initialState) => {
  // opote ftaixn ousitaka ena neo store akrivso me to idio tropo pou ftiaxno to kanoniko mou redux store sto createStore.js kai apla afto to store eiani to store pou tha xrisimopiso sta tests mou
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(
    createStore
  );
  return createStoreWithMiddleware(RootReducer, initialState);
};
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
describe("signUpUserAction action", () => {
  // prepei na kano to moxios install prin apo kathe test oste o axios na min pigeni sto intenete na kanie to request. An exo ta api mou ektos tou axios prepei na kano ena mock api isntance eod pera ala afto einai aplo paradigma kai boro na kano to moxios install kai na eiami ok
  beforeEach(() => {
    moxios.install();
  });

  // adistixa meta apo kathe test prepei na kano unistall to moxios oste to axios na doulevie mia xara
  afterEach(() => {
    moxios.uninstall();
  });

  test("Store is updated correctly", () => {
    // prepei na dimiourgios ena const pou exei ta expected data pou hta erpena apo to api me ti mofir pou to api tha mou ta edina.
    const expectedState = {
      token: 123,
      errorMessage: null,
      userId: 123,
      first_login_verify: false,
      image: null,
    };

    // dimiourgo ean test rexue store apo to function pou eftiaksa sto ceraetStore.js
    const store = testStore();

    // edo kano to mixos request adi gia afto pou exo sto action
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        // thelo na tskaro epitixeis request gia afot vazo edo status 200
        status: 200,
        // kai sto response feild vazo to expected data pou einai to const me ta dummy data pou eftiaksa
        response: {
          token: 123,
          userId: 123,
        },
      });
    });

    // edo kano dispatch to action pouythel na kano pou eian to fetchPsots pou mesa stou exei to axios call sto API apala epidi etreka apo pano to moxios dne tha treksi to axios api call pou exo mesa sto action ara to moxios to kratao opos einai kaaia pala alazo ta data sto diko mou project. Tha borousan na xirismopiso async await ala edo eox .then
    // ousitaka to action an doulevei oustiak prepei na kanie update to stoer mou. Kia ego tsearko to to consew new State (pou to perno apo to store.getState() to store eian ito test redux store pou efitaka kai me to getState perno ta data pou exei to store mou) kia apla tekaro oti tora to store mou exie akrivos ta data pou eftiaksa san dummy data stin arxi pano pano me to const expectedState pou eian ousitak ta data pou tha eprna apo to API . opote htelo na do an ta data pou pire to action eginean sosta update sto redux store
    const history = { push: jest.fn() };
    return store
      .dispatch(
        signUpUserAction(
          {
            email: "test@test.com",
            password: "password",
          },
          history
        )
      )
      .then(() => {
        const newState = store.getState();
        expect(newState.user).toStrictEqual(expectedState);
      });
  });
});
