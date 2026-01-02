import { test, expect } from '@jest/globals';
import { removeFromCart, calculateTotal } from '../../js/cart.service.js';

test('WB-CART-01 remove product from cart', () => {
  const cart = [
    { id: 1, price: 100 },
    { id: 2, price: 200 }
  ];

  const newCart = removeFromCart(cart, 1);
  expect(newCart.length).toBe(1);
  expect(newCart[0].id).toBe(2);
});

test('WB-CART-02 calculate total price', () => {
  const cart = [
    { price: 100 },
    { price: 200 }
  ];

  expect(calculateTotal(cart)).toBe(300);
});
