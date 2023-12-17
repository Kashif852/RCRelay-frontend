import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from './cart/cartSlice';
import productsReducer from './products/productSlice';
import discountsReducer from './discount/discountSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, combineReducers({
  cart: cartReducer,
  products: productsReducer,
  discounts: discountsReducer,
}));

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
