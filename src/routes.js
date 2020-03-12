/**
 * Dependencies
 */
import React from 'react';

import {
  Router,
  Route,
  IndexRoute,
} from 'react-router';

/**
 * Import higher order components
 */
import requireInitialLoad from './higher-order-components/require-initial-load';

/**
 * Containers
 */
import Root from './containers/Root';
import Search from './containers/Search';

/**
 * Routes
 */
const createRoutes = ({ history }) => (
  <Router history={history}>
    <Route path="/" component={requireInitialLoad(Root)}>
      <IndexRoute component={Search} />
    </Route>
  </Router>
);

/**
 * Export routes
 */
export default createRoutes;
