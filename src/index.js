/**
 * Dependencies
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { hashHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

/**
 * Global styles
 */
import './index.css';

/**
 * App component
 */
import createRoutes from './routes';

/**
 * Store
 */
import store from './store';

/**
 * Create history (synced with store)
 */
const history = syncHistoryWithStore(hashHistory, store);

/**
 * Create routes
 */
const routes = createRoutes({ history });

/**
 * Render app
 */
ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      {routes}
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
