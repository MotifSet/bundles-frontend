import { connect } from 'react-redux';
import {withRouter} from "react-router-dom";
import { push } from 'react-router-redux';

import * as basketActions from '../modules/baskets/actions';
import BasketDetail from '../components/basketDetail';


const mapStateToProps = (state, ownProps) => {
  const {id} = ownProps.match.params;
  return {
    prices: state.prices.prices[id],
    loading: state.baskets.loading,
    basket: state.baskets.baskets[id] || {}
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onMount: () => {
      dispatch(basketActions.fetchBaskets())
    },
    onBack: () => {
      dispatch(push('/'))
    }
  }
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(BasketDetail));
