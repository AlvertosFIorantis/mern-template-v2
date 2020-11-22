import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
// exo deflaut export se afto to file kai gia afto den vazo {} sto import kai boro oustiaka na valo ooti onma thelo
import RootReducer from './_reducers';
// to Orrote reducer einai ousitkai to index.js file pou exo sto reducers folder

export const middlewares = [ReduxThunk];


// afot einai to simadiko function pou prepei na kano export oste na to exo gia to create soter sto index.js file kai na boro na to kano import ekei pou kano ta tests mou
export const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore)


// afot boor na to valo sinithos sto index.js file
export const store = createStoreWithMiddleware(RootReducer)
