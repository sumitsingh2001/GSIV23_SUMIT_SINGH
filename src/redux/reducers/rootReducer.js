import { combineReducers } from 'redux';
import toggleReducer from './toggleReducer';
import apiReducer from './apiReducer';

const rootReducer = combineReducers({
  toggle: toggleReducer,
  api: apiReducer,
});

export default rootReducer;
