import { combineReducers } from 'redux';
import toggleReducer from './toggleReducer';
import apiReducer from './apiReducer';
import currentPageReducer from './currentPage';

const rootReducer = combineReducers({
  toggle: toggleReducer,
  api: apiReducer,
  currentPage: currentPageReducer,
});

export default rootReducer;
