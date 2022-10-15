require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it ('fetchItem deve ser uma função', () => {
    expect(typeof fetchItem).toEqual('function');
  })
  it ('fetch deve ser chamada ao passar o argumento MLB1615760527 para a função fetchItem', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHavebeenCalled();
  })
  it ('fetch deve utilizar o endpoint "https://api.mercadolibre.com/items/MLB1615760527" com o argumento "MLB1615760527"', async () => {
    await fetchItem('MLB1615760527');
    const endpoint = 'https://api.mercadolibre.com/items/MLB1615760527';
    expect(fetch).toHaveBeenCalledWith(endpoint);
  })
  it ('o retorno de fetchItem com o argumento "MLB1615760527" deve ser igual ao objeto item', async () => {
    const returnedObject = await fetchItem('MLB1615760527');
    expect(returnedObject).toEqual(item);
  })
  it ('fetchItem deve retornar um erro quando chamada sem argumentos',  async () => {
    expect(await fetchItem()).toThrow(new Error('You must provide an url!'));
  })
});
