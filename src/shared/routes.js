import React from 'react';
import {Router, Switch, Route} from 'react-router-dom';

import LandingContainer from '../containers/landingContainer';

export const routes = ({history}) => (
  <Router history={history}>
    <Switch>
      <Route path={'/'} component={LandingContainer} />
    </Switch>
  </Router>
);
