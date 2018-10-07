import * as priceActions from '../prices/actions';
import {routes} from "../../shared/apiRoutes";

export const FETCH_BASKETS = 'baskets/FETCH_BASKETS';
export const FETCH_BASKETS_SUCCESS = 'baskets/FETCH_BASKETS_SUCCESS';
export const FETCH_BASKETS_FAILURE = 'baskets/FETCH_BASKETS_FAILURE';

export function fetchBaskets(){
  // Mocked for now
  return (dispatch) => {
    dispatch({
      types: [FETCH_BASKETS, FETCH_BASKETS_SUCCESS, FETCH_BASKETS_FAILURE],
      promise: (client) => {
        return client.get(routes.baskets.all()).then((resp) => {
          const normalized = {};
          resp.forEach((basket) => {
            normalized[basket.symbol] = basket;

            // TODO: this is going to clog up like crazy..
            dispatch(priceActions.fetchPriceHistory(basket.symbol));
          });
          return normalized;
        })
      }
    })
  };
}
