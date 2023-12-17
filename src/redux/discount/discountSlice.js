import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDiscounts } from '../../services/discountService';

export const fetchDiscounts = createAsyncThunk(
  'discounts/fetchDiscounts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getDiscounts();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  discounts: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const discountsSlice = createSlice({
  name: 'discounts',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiscounts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDiscounts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.discounts = action.payload;
      })
      .addCase(fetchDiscounts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default discountsSlice.reducer;
