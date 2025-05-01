import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const initialState = {
  items: []  // her öğe: { product, quantity }
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product } = action;
      const exists = state.items.find(i => i.product.id === product.id);
      let items;
      if (exists) {
        items = state.items.map(i =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      } else {
        items = [...state.items, { product, quantity: 1 }];
      }
      return { ...state, items };
    }
    case 'REMOVE_ITEM': {
      const id = action.id;
      return {
        ...state,
        items: state.items.filter(i => i.product.id !== id)
      };
    }
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action;
      return {
        ...state,
        items: state.items.map(i =>
          i.product.id === id
            ? { ...i, quantity }
            : i
        )
      };
    }
    case 'CLEAR_CART':
      return initialState;
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // kolayı olsun diye hazır fonksiyonlar:
  const addItem       = product => dispatch({ type: 'ADD_ITEM', product });
  const removeItem    = id      => dispatch({ type: 'REMOVE_ITEM', id });
  const updateQuantity = (id, quantity) =>
                           dispatch({ type: 'UPDATE_QUANTITY', id, quantity });
  const clearCart     = ()      => dispatch({ type: 'CLEAR_CART' });

  return (
    <CartContext.Provider value={{
      items: state.items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be inside CartProvider');
  return ctx;
};
