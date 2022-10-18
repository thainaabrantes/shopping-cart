const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  it('ao executar saveCartItems com um cartItem como argumento, o método localStorage.setItem é chamado', async () => {
    await saveCartItems('cartItems');
    expect(localStorage.setItem).toBeCalled();
  })
  it('ao executar saveCartItems com um cartItem como argumento, o método localStorage.setItem deve ser chamado com dois parâmetros, chave: "cartItems" e o valor passado como argumento para saveCartItems', () => {
    saveCartItems('cartItems');
    expect(localStorage.setItem).toBeCalledWith('cartItems', 'cartItems');
  })
});
