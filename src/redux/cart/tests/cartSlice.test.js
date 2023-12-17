import cartReducer, {
    incrementItem,
    decrementItem,
    removeItemFromCart,
    addToCart,
    removeFromCart,
    clearCart,
    selectCartTotal,
    selectCartItemCount,
  } from '../cartSlice';
  
  describe('cartSlice', () => {
    const initialState = {
      items: {},
      total: null,
      status: 'idle',
      error: null,
      totalAfterDiscount: null,
    };
  
    it('should handle initial state', () => {
      expect(cartReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });
  
    it('should handle incrementItem', () => {
        const stateWithItem = { ...initialState, items: { 'item1': { quantity: 1 } } };
        const state = cartReducer(stateWithItem, incrementItem('item1'));
        expect(state.items['item1'].quantity).toBe(2);
    });
      
  
    it('should handle decrementItem', () => {
      const stateWithItem = { ...initialState, items: { 'item1': { quantity: 2 } } };
      const state = cartReducer(stateWithItem, decrementItem('item1'));
      expect(state.items['item1'].quantity).toBe(1);
    });
  
    it('should handle removeItemFromCart', () => {
      const stateWithItem = { ...initialState, items: { 'item1': { quantity: 1 } } };
      const state = cartReducer(stateWithItem, removeItemFromCart('item1'));
      expect(state.items['item1']).toBeUndefined();
    });
  
    it('should handle addToCart', () => {
      const newItem = { sku: 'item2', quantity: 1 };
      const state = cartReducer(initialState, addToCart(newItem));
      expect(state.items['item2'].quantity).toBe(1);
    });
  
    it('should handle removeFromCart', () => {
        const stateWithItem = { ...initialState, items: { 'item2': { quantity: 2 } } };
        const state = cartReducer(stateWithItem, removeFromCart({ sku: 'item2' }));
        expect(state.items['item2'].quantity).toBe(1);
      });
      
      
  
    it('should handle clearCart', () => {
      const filledState = { ...initialState, items: { 'item1': { quantity: 2 }, 'item2': { quantity: 3 } } };
      const state = cartReducer(filledState, clearCart());
      expect(state.items).toEqual({});
    });
  
    it('should select the total cart count', () => {
      const state = {
        cart: {
          items: {
            'item1': { price: 10, quantity: 2 },
            'item2': { price: 20, quantity: 1 },
          }
        }
      };
      expect(selectCartTotal(state)).toBe(40);
    });
  
    it('should select the total item count', () => {
      const state = {
        cart: {
          items: {
            'item1': { price: 10, quantity: 2 },
            'item2': { price: 20, quantity: 1 },
          }
        }
      };
      expect(selectCartItemCount(state)).toBe(3);
    });

  });
  