import React from 'react';
import {Provider} from 'react-redux';
import {routerMiddleware, syncHistoryWithStore} from 'react-router-redux';
import thunk from 'redux-thunk';
import {createStore as _createStore, applyMiddleware, compose} from 'redux';
import createHistory from 'history/createBrowserHistory';

import ApiClient from 'shared/apiClient';
import clientMiddleware from 'shared/middleware/clientMiddleware';


class App extends React.Component {
  render() {
    const createStore = (history) => {
      const client = new ApiClient();
      const data = window.__data;
      const reduxRouterMiddleware = routerMiddleware(history);

      const middleware = [clientMiddleware(client), reduxRouterMiddleware, thunk];

      const enhancer = compose(
        applyMiddleware(...middleware)
      );

      const reducer = require('modules/reducers').default;
      const store = _createStore(reducer, data, enhancer);

      return store;
    };

    const browserHistory = createHistory();
    const store = createStore(browserHistory);
    syncHistoryWithStore(browserHistory, store);

    return (
      <Provider store={store}>
        <div>
          {/* ROUTES */}
        </div>
      </Provider>
    )
  }
}

export default App;
