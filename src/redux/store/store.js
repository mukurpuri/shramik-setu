// Imports: Dependencies
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
//import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';

import AsyncStorage from '@react-native-community/async-storage';


// Imports: Redux
import rootReducer from '../reducers/index';

// Middleware: Redux Persist Config
const persistConfig = {
  // Root?
  key: 'root',
  storage: AsyncStorage,
  timeout: null,
  // Whitelist (Save Specific Reducers)
  whitelist: [
    'settingsReducer',
    'userReducer'
  ],
  // Blacklist (Don't Save Specific Reducers)
  blacklist: [
    'counterReducer',
  ],
};

// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)
const middlewares = [thunk];

// Redux: Store
const store = createStore(
  persistedReducer,
  applyMiddleware(
    ...middlewares
  ),
);

// Middleware: Redux Persist Persister
let persistor = persistStore(store);

// Exports
export {
  store,
  persistor,
};