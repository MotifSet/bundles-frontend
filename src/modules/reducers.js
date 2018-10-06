import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {reducer as form} from 'redux-form';
import baskets from './baskets/reducer';
import prices from './prices/reducer';

export default combineReducers({
  routing: routerReducer,
  form,
  baskets,
  prices
});
