import {
  GET_BALANCE,
  GET_BALANCE_SUCCESS,
  GET_BALANCE_FAILURE,
  CREATE_ORDER,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE
} from "./actions";

const initialState = () => {
  return {
    loading: {
      balance: true,
      order: false
    },
    ordered: false,
    balance: 0
  }
};

export default function reducer(state=initialState(), action={}){
  switch (action.type){
    case GET_BALANCE:
      return {...state, loading: {...state.loading, balance: true}};
    case GET_BALANCE_SUCCESS:
      return {...state, loading: {...state.loading, balance: true}, balance: action.payload};
    case CREATE_ORDER:
      return {...state, loading: {...state.loading, order: true}};
    case CREATE_ORDER_SUCCESS:
      return {...state, loading: {...state.loading, order: false}, ordered: true};
    default:
      return state;
  }
}
