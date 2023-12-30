// Importing the createStore function from Redux for creating the store
import { createStore } from 'redux';

// Importing the persistStore function from redux-persist for persisting the store
import { persistStore } from 'redux-persist';

// Importing the root reducer that combines all reducers
import persistedReducer from './redux/rootReducer';

// Creating the Redux store using the root reducer
const store = createStore(persistedReducer);

// Creating a persistor to persist the store using redux-persist
const persistor = persistStore(store);

// Exporting the created store and persistor for use in the application
export { store, persistor };
