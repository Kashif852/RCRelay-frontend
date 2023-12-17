import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Layout from '../Layout';

jest.mock('../Footer/Footer', () => {
  return {
    __esModule: true,
    default: () => <footer>Mock Footer</footer>,
  };
});

jest.mock('../Navbar/Navbar', () => {
  return {
    __esModule: true,
    default: () => <nav>Mock Navbar</nav>,
  };
});

describe('Layout', () => {
  it('renders the layout with Navbar, children, and Footer', () => {
    render(
      <Layout>
        <div>Example Content</div>
      </Layout>
    );

    expect(screen.getByText('Mock Navbar')).toBeInTheDocument();

    expect(screen.getByText('Example Content')).toBeInTheDocument();

    expect(screen.getByText('Mock Footer')).toBeInTheDocument();
  });
});
