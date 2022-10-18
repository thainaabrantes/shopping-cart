const saveCartItems = (id) => {
  if (!id) throw new Error('Empty payload!');
  localStorage.setItem('cartItems', id);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
