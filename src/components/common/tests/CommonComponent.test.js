import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AppRouter from '../Router'; 
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore();
const store = mockStore({
  cart: {
    items: {
      ipd: { quantity: 1 },
      mbp: { quantity: 1 },
      atv: { quantity: 1 },
      vga: { quantity: 1 },
    },
  },
});

jest.mock('../../../routes/config', () => [
  { path: '/', component: () => <div>Home Component</div> },
  { path: '/products', component: () => <div>Products Component</div> },
  { path: '/checkout', component: () => <div>Checkout Component</div> },
]);

describe('AppRouter', () => {
  it('renders the correct component for the home route', () => {
    window.history.pushState({}, '', '/');
    render(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );
    expect(screen.getByText('Home Component')).toBeInTheDocument();
  });

  it('renders the correct component for the products route', () => {
    window.history.pushState({}, '', '/products');
    render(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );
    expect(screen.getByText('Products Component')).toBeInTheDocument();
  });

  it('renders the correct component for the checkout route', () => {
    window.history.pushState({}, '', '/checkout');
    render(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );
    expect(screen.getByText('Checkout Component')).toBeInTheDocument();
  });
});
