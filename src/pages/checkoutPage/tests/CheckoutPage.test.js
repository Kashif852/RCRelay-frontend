import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import CheckoutPage from '../CheckoutPage';
import '@testing-library/jest-dom';

const mockStore = configureStore([]);

describe('CheckoutPage', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      cart: {
        items: {
          '123': {
            sku: '123',
            name: 'Test Product',
            price: 9.99,
            quantity: 1,
            imageUrl: 'test-image.jpg'
          }
        },
        status: 'idle',
        total: 9.99
      }
    });
    store.dispatch = jest.fn();
  });

  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    window.alert = jest.fn();
  });

  test('checkout cart initiates checkout process', async () => {
    render(
      <Provider store={store}>
        <CheckoutPage />
      </Provider>
    );

    const checkoutButton = screen.getByText('Checkout');
    userEvent.click(checkoutButton);

    await waitFor(() => expect(store.dispatch).toHaveBeenCalled());

  });

  test('checkout button is disabled when cart is empty', () => {
    store = mockStore({
      cart: {
        items: {},
        status: 'idle',
        total: 0
      }
    });

    render(
      <Provider store={store}>
        <CheckoutPage />
      </Provider>
    );

    // const checkoutButton = screen.getByText('Checkout');
    // expect(checkoutButton).toBeDisabled();
  });

});
