// js/cart.js

const cart = JSON.parse(localStorage.getItem('cart')) || [];
const list = document.getElementById('cart-list');

if (cart.length === 0) {
  list.innerHTML = '<p>Giỏ hàng trống</p>';
} else {
  list.innerHTML = '';
  cart.forEach(item => {
    const div = document.createElement('div');
    div.className = 'cart-item';

    div.innerHTML = `
      <div class="cart-card">
        <div class="cart-info">
          <h3>${item.name}</h3>
          <p class="price">${item.price.toLocaleString()}đ</p>
        </div>
      </div>
    `;

    list.appendChild(div);
  });
}

document.querySelector('[data-testid="checkout-btn"]')
  ?.addEventListener('click', () => {
    alert('Đặt hàng thành công!');
    localStorage.removeItem('cart');
    window.location.reload();
  });
