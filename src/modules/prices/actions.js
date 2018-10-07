import moment from "moment";
import Series from "time-series-data-generator";
import {routes} from "../../shared/apiRoutes";

export const FETCH_PRICE_HISTORY = 'prices/FETCH_PRICE_HISTORY';
export const FETCH_PRICE_HISTORY_SUCCESS = 'prices/FETCH_PRICE_HISTORY_SUCCESS';
export const FETCH_PRICE_HISTORY_FAILURE = 'prices/FETCH_PRICE_HISTORY_FAILURE';

export function fetchPriceHistory(symbol){
  return (dispatch) => {
    dispatch({
      types: [FETCH_PRICE_HISTORY, FETCH_PRICE_HISTORY_SUCCESS, FETCH_PRICE_HISTORY_FAILURE],
      promise: (client) => {
        return client.get(routes.prices.detail(symbol))
          .then((resp) => {
            return {[symbol]: resp}
          })
      }
    })
  }
}
