import {
  FETCH_PRICE_HISTORY,
  FETCH_PRICE_HISTORY_SUCCESS,
  FETCH_PRICE_HISTORY_FAILURE
} from "./actions";

function initialState(){
  return {
    loading: {}, // Keys will be basket/asset symbols
    prices: {} // {[id]: []}
  }
}

export default function reducer(state=initialState(), action={}){
  switch(action.type){
    case FETCH_PRICE_HISTORY_SUCCESS:
      return {
        ...state,
        loading: {...state.loading, [Object.keys(action.payload)[0]]: false},
        prices: {...state.prices, ...action.payload}
      };
    default:
      return state;
  }
}
