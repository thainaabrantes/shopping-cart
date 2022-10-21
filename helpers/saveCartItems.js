const saveCartItems = (item) => {
  if (!item) throw new Error('Empty payload!');
  localStorage.setItem('cartItems', item);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
