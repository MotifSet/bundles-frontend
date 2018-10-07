import React from 'react';
import {Router, Switch, Route} from 'react-router-dom';

import LandingContainer from '../containers/landingContainer';
import BasketDetailContainer from '../containers/basketDetailContainer';

export const routes = ({history}) => (
  <Router history={history}>
    <Switch>
      <Route path={'/baskets/:id/'} component={BasketDetailContainer}/>
      <Route path={'/'} component={LandingContainer} />
    </Switch>
  </Router>
);
