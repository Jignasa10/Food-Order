import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

import {
  persistReducer,
  persistStore,
} from "redux-persist";

import storage from "redux-persist/lib/storage"; //  localStorage

// Persist Config
const persistConfig = {
  key: "root",
  storage,
};

//  Wrap reducer with persistReducer
const persistedCartReducer = persistReducer(
  persistConfig,
  cartReducer
);

export const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

//  Persistor
export const persistor = persistStore(store);
