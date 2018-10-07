import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {reducer as form} from 'redux-form';
import baskets from './baskets/reducer';
import prices from './prices/reducer';
import web3 from './web3/reducer';

export default combineReducers({
  routing: routerReducer,
  form,
  baskets,
  prices,
  web3
});
