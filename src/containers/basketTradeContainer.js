import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {push} from 'react-router-redux';

import * as basketActions from '../modules/baskets/actions';
import * as web3Actions from '../modules/web3/actions';
import BasketTrade from '../components/basketTrade';

const mapStateToProps = (state, ownProps) => {
  const { id, tradeType } = ownProps.match.params;
  const basket = state.baskets.baskets[id] || {};

  return {
    loading: state.baskets.loading,
    web3Loading: state.web3.loading,
    web3Enabled: !!window.__WEB3_PROVIDER__.injectedWeb3,
    validNetwork: window.__WEB3_PROVIDER__.validNetwork()
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onMount: () => {
      dispatch(basketActions.fetchBaskets());
    },
    onBack: () => {
      dispatch(push(`/baskets/${ownProps.match.params.id}`))
    }
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(BasketTrade));
