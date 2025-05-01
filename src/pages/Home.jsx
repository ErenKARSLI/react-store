import React from 'react';
import useFetchProducts from '../hooks/useFetchProducts';
import ProductCard from '../components/ProductCard';
import styled from 'styled-components';

// Ürün kartlarının grid düzeni için styled-component
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 2rem;
  padding: 2rem;
`;

const Home = () => {
  const { products, loading, error } = useFetchProducts();

  if (loading) return <p style={{ padding: '2rem' }}>Yükleniyor…</p>;
  if (error)   return <p style={{ padding: '2rem', color: 'red' }}>Hata: {error}</p>;

  return (
    <Grid>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Grid>
  );
};

export default Home;
