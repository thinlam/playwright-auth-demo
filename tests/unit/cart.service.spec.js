const { test, expect, describe } = require('@jest/globals');
const { removeFromCart, calculateTotal } = require('../../js/cart.service.js');

describe('White Box Testing – Cart Service (WB-CART)', () => {

  /* ===============================
     removeFromCart
     =============================== */

  test('WB-CART-01: remove existing product from cart (branch coverage)', () => {
    const cart = [
      { id: 1, price: 100 },
      { id: 2, price: 200 }
    ];

    const newCart = removeFromCart(cart, 1);
    expect(newCart.length).toBe(1);
    expect(newCart[0].id).toBe(2);
  });

  test('WB-CART-02: remove non-existing product (branch coverage)', () => {
    const cart = [
      { id: 1, price: 100 }
    ];

    const newCart = removeFromCart(cart, 999);
    expect(newCart.length).toBe(1);
    expect(newCart[0].id).toBe(1);
  });

  test('WB-CART-03: remove product from empty cart (path coverage)', () => {
    const cart = [];

    const newCart = removeFromCart(cart, 1);
    expect(newCart.length).toBe(0);
  });

  /* ===============================
     calculateTotal
     =============================== */

  test('WB-CART-04: calculate total price with multiple items (path coverage)', () => {
    const cart = [
      { price: 100 },
      { price: 200 }
    ];

    expect(calculateTotal(cart)).toBe(300);
  });

  test('WB-CART-05: calculate total price with one item', () => {
    const cart = [
      { price: 150 }
    ];

    expect(calculateTotal(cart)).toBe(150);
  });

  test('WB-CART-06: calculate total with empty cart (branch + condition coverage)', () => {
    const cart = [];

    expect(calculateTotal(cart)).toBe(0);
  });

  test('WB-CART-07: calculate total when item price is 0 (condition coverage)', () => {
    const cart = [
      { price: 0 },
      { price: 200 }
    ];

    expect(calculateTotal(cart)).toBe(200);
  });

});
