// Importing the persistReducer function from redux-persist
import { persistReducer } from 'redux-persist';

// Importing the storage engine from redux-persist to determine where the data will be stored
import storage from 'redux-persist/lib/storage';

// Importing the root reducer from the './reducers' file
import reducer from './reducers';

// Configuration object for redux-persist
const persistConfig = {
  key: 'root', // The key to use when saving and loading the persisted state
  storage, // This will use `localStorage` by default; we can change it to `sessionStorage` if needed
};

// Creating the persisted reducer by wrapping the root reducer with redux-persist
const persistedReducer = persistReducer(persistConfig, reducer);

// Exporting the persisted reducer for use in the application
export default persistedReducer;
