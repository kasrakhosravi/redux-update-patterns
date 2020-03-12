/**
 * Dependencies
 */
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

/**
 * Import reducers / features
 */
import outfitReducer, { NAME as outfitsStateName } from './ducks/outfits';

/**
 * Create combined reducer
 */
export default combineReducers({
  [outfitsStateName]: outfitReducer,
  routing,
});
