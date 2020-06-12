// Imports: Dependencies
import { combineReducers } from 'redux';

// Imports: Reducers
import userReducer from './userReducer';
import settingsReducer from './settingsReducer';

// Redux: Root Reducer
const rootReducer = combineReducers({
  userReducer: userReducer,
  settingsReducer: settingsReducer
});

// Exports
export default rootReducer;