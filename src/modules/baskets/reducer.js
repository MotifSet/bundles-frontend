import {
  FETCH_BASKETS,
  FETCH_BASKETS_SUCCESS,
  FETCH_BASKETS_FAILURE
} from "./actions";

function initialState(){
  return {
    baskets: [],
    loading: {
      baskets: true
    }
  }
}

export default function reducer(state=initialState(), action={}){
  switch(action.type){
    case FETCH_BASKETS_SUCCESS:
      return {
        ...state,
        loading: {...state.loading, baskets: false},
        baskets: [...action.payload]
      };
    default:
      return state;
  }
}
