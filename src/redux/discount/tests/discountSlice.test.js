import discountsReducer, { fetchDiscounts } from '../discountSlice';

describe('discountsSlice', () => {
  const initialState = {
    discounts: [],
    status: 'idle',
    error: null,
  };

  it('should handle initial state', () => {
    expect(discountsReducer(undefined, { type: 'unknown' })).toEqual({
      discounts: [],
      status: 'idle',
      error: null,
    });
  });

  it('should handle fetchDiscounts.pending', () => {
    const action = { type: fetchDiscounts.pending.type };
    const state = discountsReducer(initialState, action);
    expect(state).toEqual({
      discounts: [],
      status: 'loading',
      error: null,
    });
  });

  it('should handle fetchDiscounts.fulfilled', () => {
    const mockDiscounts = [{ id: 1, name: 'Discount 1' }, { id: 2, name: 'Discount 2' }];
    const action = { type: fetchDiscounts.fulfilled.type, payload: mockDiscounts };
    const state = discountsReducer(initialState, action);
    expect(state).toEqual({
      discounts: mockDiscounts,
      status: 'succeeded',
      error: null,
    });
  });

  it('should handle fetchDiscounts.rejected', () => {
    const error = 'Error fetching discounts';
    const action = { type: fetchDiscounts.rejected.type, error: { message: error } };
    const state = discountsReducer(initialState, action);
    expect(state).toEqual({
      discounts: [],
      status: 'failed',
      error: error,
    });
  });
});
