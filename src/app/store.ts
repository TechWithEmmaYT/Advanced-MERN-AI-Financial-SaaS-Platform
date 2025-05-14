import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import storage from 'redux-persist/lib/storage'
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import { apiClient } from './api-client';
//import { encryptTransform } from 'redux-persist-transform-encrypt';

type RootReducerType = ReturnType<typeof rootReducer>;

const persistConfig = {
    key: 'root', // Key for the persisted data in storage
    storage, // Storage engine to use (localStorage)
    blacklist: [apiClient.reducerPath], // Specify which reducers not to persist (RTK Query cache)
    // transforms: [
    //     encryptTransform({
    //       secretKey: import.meta.env.VITE_REDUX_PERSIST_SECRET_KEY!,
    //       onError: function (error) {
    //         console.error('Encryption error:', error);
    //       },
    //     }),
    //   ],
}

const rootReducer = combineReducers({
    [apiClient.reducerPath]: apiClient.reducer, // Add API client reducer to root reducer
    auth:authReducer, // Add auth reducer to root reducer
  })

  // Create a persisted version of the root reducer
  const persistedReducer = persistReducer<RootReducerType>(persistConfig, rootReducer);


const reduxPersistActions = [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
  

export const store = configureStore({
    reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: reduxPersistActions, /// Ignore specific actions in serializable checks
      },
    }).concat(apiClient.middleware),
});

export const persistor = persistStore(store) // Create a persistor linked to the store



export type RootState = ReturnType<typeof store.getState>
