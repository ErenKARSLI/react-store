import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import ProductCard from './ProductCard';

const mockProduct = {
  id: 1,
  title: 'Test Ürünü',
  price: 9.99,
  image: 'https://via.placeholder.com/150'
};

test('ProductCard başlık, fiyat ve görseli doğru gösterir', () => {
  render(
    <BrowserRouter>
      <ProductCard product={mockProduct} />
    </BrowserRouter>
  );
  expect(screen.getByText(/Test Ürünü/)).toBeInTheDocument();
  expect(screen.getByText(/\$9.99/)).toBeInTheDocument();
  const img = screen.getByAltText(/Test Ürünü/);
  expect(img).toHaveAttribute('src', mockProduct.image);
});
