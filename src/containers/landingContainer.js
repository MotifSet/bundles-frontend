import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Landing from '../components/landing';

import * as basketActions from '../modules/baskets/actions';
import {withRouter} from "react-router-dom";

const mapStateToProps = (state) => {
  return {
    prices: state.prices.prices,
    baskets: state.baskets.baskets || []
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onMount: () => {
      dispatch(basketActions.fetchBaskets());
    },
    onBasketClick: (id) => () => {
      dispatch(push(`/baskets/${id}`))
    }
  }
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing));
