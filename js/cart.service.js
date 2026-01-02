export function removeFromCart(cart, productId) {
  return cart.filter(item => item.id !== productId);
}

export function calculateTotal(cart) {
  return cart.reduce((sum, item) => sum + item.price, 0);
}
