import * as priceActions from '../prices/actions';

export const FETCH_BASKETS = 'baskets/FETCH_BASKETS';
export const FETCH_BASKETS_SUCCESS = 'baskets/FETCH_BASKETS_SUCCESS';
export const FETCH_BASKETS_FAILURE = 'baskets/FETCH_BASKETS_FAILURE';

export function fetchBaskets(){
  // Mocked for now
  return (dispatch) => {
    dispatch({
      type: FETCH_BASKETS_SUCCESS,
      payload: [{
        id: 1,
        address: '0x0',
        name: 'Black Swans',
        weekly_percent_change: -0.87,
        components: [],
        description: 'The Black Swan Basket consists of predictions and erc20 tokens that are considered low success probability, but high reward.',
        colors: ['#0F2027', '#203A43', '#2C5364'],
        invert_graph_color: true,
        price_eth: 0.13,
        price_fiat: 29.04
      }]
    });

    // TODO: use response data to get symbols
    dispatch(priceActions.fetchPriceHistory(1))
  };
}
