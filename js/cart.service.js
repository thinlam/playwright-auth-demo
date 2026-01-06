function removeFromCart(cart, productId) {
  return cart.filter(item => item.id !== productId);
}

function calculateTotal(cart) {
  return cart.reduce((sum, item) => sum + item.price, 0);
}

module.exports = {
  removeFromCart,
  calculateTotal
};
