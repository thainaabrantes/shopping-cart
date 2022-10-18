require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it ('fetchProducts deve ser uma função', () => {
    expect(typeof fetchProducts).toEqual('function');
  })
  it ('fetch deve ser chamada ao passar o argumento computador para a função fetchProducts', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  })
  it ('fetch deve utilizar o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador" com o argumento "computador"', async () => {
    await fetchProducts('computador');
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    expect(fetch).toHaveBeenCalledWith(endpoint);
  })
  it ('o retorno de fetchProducts com o argumento "computador" deve ser igual ao objeto computadorSearch', async () => {
    const returnedObject = await fetchProducts('computador');
    expect(returnedObject).toEqual(computadorSearch);
  })
  it ('fetchProducts deve retornar um erro quando chamada sem argumentos', async () => {
    try {
      await fetchProducts();
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url!'));
    }
  })
});
