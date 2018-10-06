import { connect } from 'react-redux';
import BasketDetail from '../components/basketDetail';

import {withRouter} from "react-router-dom";

const mapStateToProps = (state, ownProps) => {
  const {id} = ownProps.match.params;
  return {
    prices: state.prices.prices[id],
    basket: state.baskets.baskets[id] || {}
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  }
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(BasketDetail));
