import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Landing from '../components/landing';

import * as basketActions from '../modules/baskets/actions';
import * as priceActions from '../modules/prices/actions';

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onMount: () => {
      dispatch(basketActions.fetchBaskets());
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing);
