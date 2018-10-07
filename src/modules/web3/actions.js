export const GET_BALANCE = 'web3/GET_BALANCE';
export const GET_BALANCE_SUCCESS = 'web3/GET_BALANCE_SUCCESS';
export const GET_BALANCE_FAILURE = 'web3/GET_BALANCE_FAILURE';

export function getBalance(address){
  return (dispatch) => {
    if(!address){
      return;
    }
    dispatch({
      type: GET_BALANCE
    });

    window.__WEB3_PROVIDER__.getBalanceForAddress(address)
      .then(b => dispatch({
        type: GET_BALANCE_SUCCESS,
        payload: b
      }));
  }
}
