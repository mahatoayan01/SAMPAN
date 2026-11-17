import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

function getStoredCart() {
  try {
    const stored = localStorage.getItem('sampan-cart');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem('sampan-cart', JSON.stringify(cart));
  } catch {
    // storage unavailable
  }
}

function cartReducer(state, action) {
  let newState;
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.find((item) => item.id === action.payload.id);
      if (existing) {
        newState = state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newState = [...state, { ...action.payload, quantity: 1 }];
      }
      break;
    }
    case 'REMOVE_ITEM':
      newState = state.filter((item) => item.id !== action.payload);
      break;
    case 'UPDATE_QUANTITY':
      if (action.payload.quantity <= 0) {
        newState = state.filter((item) => item.id !== action.payload.id);
      } else {
        newState = state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        );
      }
      break;
    case 'CLEAR_CART':
      newState = [];
      break;
    default:
      return state;
  }
  saveCart(newState);
  return newState;
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, [], getStoredCart);

  const addItem = (item) => dispatch({ type: 'ADD_ITEM', payload: item });
  const removeItem = (id) => dispatch({ type: 'REMOVE_ITEM', payload: id });
  const updateQuantity = (id, quantity) =>
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addItem, removeItem, updateQuantity, clearCart, totalItems, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
