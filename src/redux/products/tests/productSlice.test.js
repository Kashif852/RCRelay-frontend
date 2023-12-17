import productsReducer, { fetchProducts } from '../productSlice';

describe('productsSlice', () => {
  const initialState = {
    items: [],
    status: 'idle',
    error: null,
  };

  it('should handle initial state', () => {
    expect(productsReducer(undefined, { type: 'unknown' })).toEqual({
      items: [],
      status: 'idle',
      error: null,
    });
  });

  it('should handle fetchProducts.pending', () => {
    const action = { type: fetchProducts.pending.type };
    const state = productsReducer(initialState, action);
    expect(state).toEqual({
      items: [],
      status: 'loading',
      error: null,
    });
  });

  it('should handle fetchProducts.fulfilled', () => {
    const mockProducts = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
    const action = { type: fetchProducts.fulfilled.type, payload: mockProducts };
    const state = productsReducer(initialState, action);
    expect(state).toEqual({
      items: mockProducts,
      status: 'succeeded',
      error: null,
    });
  });

  it('should handle fetchProducts.rejected', () => {
    const error = 'Error message';
    const action = { type: fetchProducts.rejected.type, error: { message: error } };
    const state = productsReducer(initialState, action);
    expect(state).toEqual({
      items: [],
      status: 'failed',
      error: error,
    });
  });
});
