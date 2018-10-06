import moment from "moment";
import Series from "time-series-data-generator";

export const FETCH_PRICE_HISTORY = 'prices/FETCH_PRICE_HISTORY';
export const FETCH_PRICE_HISTORY_SUCCESS = 'prices/FETCH_PRICE_HISTORY_SUCCESS';
export const FETCH_PRICE_HISTORY_FAILURE = 'prices/FETCH_PRICE_HISTORY_FAILURE';

export function fetchPriceHistory(id){
  // mocked for now
  const week_ago = moment().subtract(7, 'days').toISOString();
  const now = moment().toISOString();
  const interval = 30 * 60; // 30 minutes
  const keyName = 'price';
  const mockDataParams = {
    from: week_ago,
    until: now,
    interval,
    keyName
  };
  return {
    type: FETCH_PRICE_HISTORY_SUCCESS,
    payload: {[id]: new Series(mockDataParams).sin()}
  }
}
