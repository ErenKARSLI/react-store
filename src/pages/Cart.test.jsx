import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { CartProvider } from '../contexts/CartContext';
import Cart from './Cart';

const renderWithCart = (ui) =>
  render(ui, { wrapper: ({ children }) => (
    <MemoryRouter>
      <CartProvider>{children}</CartProvider>
    </MemoryRouter>
  )});

test('boş sepette uyarı mesajı gösterir', () => {
  renderWithCart(<Cart />);
  expect(screen.getByText(/Sepetiniz boş/i)).toBeInTheDocument();
});
