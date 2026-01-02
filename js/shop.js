// js/shop.js

function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(product) {
  const cart = getCart();
  cart.push(product);
  saveCart(cart);

  // chuyển sang giỏ hàng
  window.location.href = '/cart';
}

// gắn sự kiện
document.querySelector('[data-testid="add-1"]')
  ?.addEventListener('click', e => {
    e.preventDefault();
    addToCart({ id: 1, name: 'Áo thun nam', price: 199000 });
  });

document.querySelector('[data-testid="add-2"]')
  ?.addEventListener('click', e => {
    e.preventDefault();
    addToCart({ id: 2, name: 'Giày sneaker', price: 499000 });
  });

document.querySelector('[data-testid="add-3"]')
  ?.addEventListener('click', e => {
    e.preventDefault();
    addToCart({ id: 3, name: 'Balo du lịch', price: 299000 });
  });
