import {
  GET_BALANCE,
  GET_BALANCE_SUCCESS,
  GET_BALANCE_FAILURE
} from "./actions";

const initialState = () => {
  return {
    loading: {
      balance: true
    },
    balance: 0
  }
};

export default function reducer(state=initialState(), action={}){
  switch (action.type){
    case GET_BALANCE:
      return {...state, loading: {...state.loading, balance: true}};
    case GET_BALANCE_SUCCESS:
      return {...state, loading: {...state.loading, balance: true}, balance: action.payload};
    default:
      return state;
  }
}
