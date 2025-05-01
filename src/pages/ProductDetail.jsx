import React, { useState, useEffect } from 'react';
import { useParams }               from 'react-router-dom';
import axios                        from 'axios';
import styled                       from 'styled-components';
import { useCart }                  from '../contexts/CartContext';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 2rem;
  background: #ffffff;
  border-radius: 8px;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  margin-bottom: 1rem;
`;

const Description = styled.p`
  flex: 1;
  margin-bottom: 1rem;
`;

const Price = styled.span`
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem;
  background: #0070f3;
  color: #fff;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #005bb5;
  }
`;

const ProductDetail = () => {
  const { id }      = useParams();
  const [product, setProduct] = useState(null);
  const { addItem } = useCart();

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!product) {
    return <p style={{ padding: '2rem' }}>Yükleniyor…</p>;
  }

  return (
    <Container>
      <Image src={product.image} alt={product.title} />
      <Details>
        <Title>{product.title}</Title>
        <Description>{product.description}</Description>
        <Price>${product.price.toFixed(2)}</Price>
        <Button onClick={() => addItem(product)}>
          Sepete Ekle
        </Button>
      </Details>
    </Container>
  );
};

export default ProductDetail;
