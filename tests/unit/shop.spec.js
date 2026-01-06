const { describe, test, expect, beforeEach } = require('@jest/globals');
const { getCart, saveCart, addToCart } = require('../../js/shop.js');

describe('Unit Test – Shop Service', () => {

  beforeEach(() => {
    let store = {};

    global.localStorage = {
      getItem: key => store[key] || null,
      setItem: (key, value) => { store[key] = value; },
      clear: () => { store = {}; }
    };
  });

  test('UT-SHOP-01: getCart returns empty array when no cart', () => {
    expect(getCart()).toEqual([]);
  });

  test('UT-SHOP-02: saveCart saves cart to localStorage', () => {
    const cart = [{ id: 1, name: 'Áo thun', price: 100 }];
    saveCart(cart);
    expect(JSON.parse(localStorage.getItem('cart'))).toEqual(cart);
  });

  test('UT-SHOP-03: addToCart adds product to cart', () => {
    const product = { id: 2, name: 'Giày', price: 200 };
    const mockRedirect = jest.fn();

    addToCart(product, mockRedirect);

    const cart = JSON.parse(localStorage.getItem('cart'));
    expect(cart.length).toBe(1);
    expect(cart[0]).toEqual(product);
  });

  test('UT-SHOP-04: addToCart redirects to /cart', () => {
    const product = { id: 3, name: 'Balo', price: 300 };
    const mockRedirect = jest.fn();

    addToCart(product, mockRedirect);

    expect(mockRedirect).toHaveBeenCalledWith('/cart');
  });

});
