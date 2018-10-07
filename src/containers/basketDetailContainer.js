import { connect } from 'react-redux';
import {withRouter} from "react-router-dom";
import { push } from 'react-router-redux';

import * as basketActions from '../modules/baskets/actions';
import * as web3Actions from '../modules/web3/actions';
import BasketDetail from '../components/basketDetail';
import {Web3Module} from "../shared/utils";


const mapStateToProps = (state, ownProps) => {
  const {id} = ownProps.match.params;
  const basket = state.baskets.baskets[id] || {};

  return {
    prices: state.prices.prices[id],
    loading: state.baskets.loading,
    basket,
    balance: state.web3.balance,
    web3Loading: state.web3.loading,
    web3Enabled: !!window.__WEB3_PROVIDER__.injectedWeb3,
    validNetwork: window.__WEB3_PROVIDER__.validNetwork()
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onMount: (addr) => {
      dispatch(basketActions.fetchBaskets());
      dispatch(web3Actions.getBalance(addr));
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
