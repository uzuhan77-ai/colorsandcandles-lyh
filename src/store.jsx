import { createContext, useContext, useEffect, useState } from 'react';
import { products } from './data.js';

export const DELIVERY_FEE = 100;

const StoreContext = createContext(null);

const load = (key) => JSON.parse(localStorage.getItem(key) || '[]');

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => load('cart'));
  const [orders, setOrders] = useState(() => load('orders'));
  useEffect(() => localStorage.setItem('cart', JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem('orders', JSON.stringify(orders)), [orders]);

  const addToCart = (item) => setCart((c) => [...c, { ...item, key: Date.now() + Math.random() }]);
  const removeFromCart = (key) => setCart((c) => c.filter((i) => i.key !== key));
  const lines = cart.map((i) => ({ ...i, product: products.find((p) => p.id === i.id) })).filter((i) => i.product);
  const subtotal = lines.reduce((s, i) => s + i.product.price * i.days * i.qty, 0);

  const placeOrder = (info) => {
    const order = { no: 'PB' + Date.now().toString().slice(-8), date: new Date().toISOString(), info, lines: cart, total: subtotal + DELIVERY_FEE };
    setOrders((o) => [order, ...o]);
    setCart([]);
    return order;
  };

  return (
    <StoreContext.Provider value={{ cart, lines, subtotal, orders, addToCart, removeFromCart, placeOrder }}>
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);
