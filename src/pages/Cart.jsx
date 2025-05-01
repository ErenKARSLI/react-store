import React from 'react';
import { useCart } from '../contexts/CartContext';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  padding: 2rem;
`;
const Item = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;
const Img = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
  margin-right: 1rem;
`;
const Title = styled.p`
  flex: 1;
`;
const QtyControls = styled.div`
  display: flex;
  align-items: center;
  & > button { margin: 0 0.5rem; }
`;
const Total = styled.h2`
  margin-top: 2rem;
`;

const Cart = () => {
  const { items, removeItem, updateQuantity, clearCart } = useCart();

  const total = items
    .reduce((sum, i) => sum + i.product.price * i.quantity, 0)
    .toFixed(2);

  if (items.length === 0) {
    return (
      <Container>
        <h1>Sepetiniz boş</h1>
        <Link to="/">Alışverişe devam et</Link>
      </Container>
    );
  }

  return (
    <Container>
      <h1>Sepetim</h1>
      {items.map(i => (
        <Item key={i.product.id}>
          <Img src={i.product.image} alt={i.product.title} />
          <Title>{i.product.title}</Title>
          <QtyControls>
            <button onClick={() =>
              updateQuantity(i.product.id, i.quantity - 1)
            } disabled={i.quantity <= 1}>–</button>
            <span>{i.quantity}</span>
            <button onClick={() =>
              updateQuantity(i.product.id, i.quantity + 1)
            }>+</button>
          </QtyControls>
          <p style={{ width: '80px', textAlign: 'right' }}>
            ${(i.product.price * i.quantity).toFixed(2)}
          </p>
          <button onClick={() => removeItem(i.product.id)}>
            ×
          </button>
        </Item>
      ))}
      <Total>Toplam: ${total}</Total>
      <button onClick={clearCart}>Sepeti Boşalt</button>{' '}
      <Link to="/checkout">
        <button>Ödeme Yap</button>
      </Link>
    </Container>
  );
};

export default Cart;
