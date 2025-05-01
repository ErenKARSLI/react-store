import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Kart kapsayıcısı
const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

// Görsel sarmalayıcı
const ImageWrapper = styled.div`
  width: 100%;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #fff;
`;

// Görselin kendisi
const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

// Kart içeriği
const Body = styled.div`
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

// Başlık: iki satır görünecek, fazlası ... ile gizlenecek
const Title = styled.h4`
  font-size: 1rem;
  line-height: 1.2;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 0.5rem;
`;

// Fiyat
const Price = styled.p`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

// Detay butonu
const Button = styled(Link)`
  display: inline-block;
  padding: 0.5rem 1rem;
  background: #0070f3;
  color: #fff;
  border-radius: 4px;
  text-decoration: none;
  text-align: center;

  &:hover {
    background: #005bb5;
  }
`;

const ProductCard = ({ product }) => (
  <Card>
    <ImageWrapper>
      <Image src={product.image} alt={product.title} />
    </ImageWrapper>
    <Body>
      <Title>{product.title}</Title>
      <Price>${product.price.toFixed(2)}</Price>
      <Button to={`/product/${product.id}`}>Detay</Button>
    </Body>
  </Card>
);

export default ProductCard;
