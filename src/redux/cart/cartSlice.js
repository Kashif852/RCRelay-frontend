import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { checkout } from '../../services/checkoutService'; // Assuming checkout is the default export

export const checkoutCart = createAsyncThunk(
  'cart/checkout',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const items = Object.entries(state.cart.items).flatMap(([sku, { quantity }]) =>
        Array(quantity).fill(sku)
      );
      const response = await checkout(items);
      return response.total;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const selectCartTotal = createSelector(
  [(state) => state.cart.items],
  (items) => Object.values(items).reduce((total, item) => total + item.price * item.quantity, 0)
);

export const selectCartItemCount = createSelector(
  [(state) => state.cart.items],
  (items) => Object.values(items).reduce((totalCount, item) => totalCount + item.quantity, 0)
);

const initialState = {
  items: {},
  total: null,
  status: 'idle',
  error: null,
  totalAfterDiscount: null
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    incrementItem: (state, action) => {
      const sku = action.payload;
      if (state.items[sku]) {
        state.items[sku].quantity += 1;
      }
    },
    decrementItem: (state, action) => {
      const sku = action.payload;
      if (state.items[sku].quantity > 1) {
        state.items[sku].quantity -= 1;
      } else {
        delete state.items[sku]; 
      }
    },
    removeItemFromCart: (state, action) => {
      const sku = action.payload;
      delete state.items[sku]; 
    },
    addToCart: (state, action) => {
      const sku = action.payload.sku;
      if (state.items[sku]) {
        state.items[sku].quantity += 1;
      } else {
        state.items[sku] = { ...action.payload, quantity: 1 };
      }
    },
    removeFromCart: (state, action) => {
      const sku = action.payload.sku;
      if (state.items[sku].quantity > 1) {
        state.items[sku].quantity -= 1;
      } else {
        delete state.items[sku];
      }
    },
    clearCart: (state) => {
      state.items = {};
      state.total = null;
      state.totalAfterDiscount = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkoutCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkoutCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.totalAfterDiscount = action.payload; 
        state.items = {}; 
      })
      .addCase(checkoutCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; 
      });
  },
});

export const { incrementItem,removeItemFromCart, decrementItem, addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
