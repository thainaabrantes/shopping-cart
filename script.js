/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto. 
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */
const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const appendProduct = async (query) => {
  const sectionProducts = document.getElementsByClassName('items')[0];
  const data = await fetchProducts(query);
  const { results } = data;
  results.map((item) => {
    const product = createProductItemElement(item);
    return sectionProducts.appendChild(product);
  });
};

const cartItems = document.querySelector('.cart__items');

const getTotalPrice = () => {
  let sum = 0;
  cartItems.childNodes.forEach((li) => {
    sum += Number(li.innerText.split('$')[1]);
  });
  const htmlPrice = document.querySelector('.total-price');
  htmlPrice.innerHTML = `Preço Total: R$ ${sum}`;
};

const removeProductOfStorage = (product) => {
  const productsOfStorage = JSON.parse(getSavedCartItems());
  const savedProducts = productsOfStorage.filter((item) => item.id !== product.id);
  saveCartItems(JSON.stringify(savedProducts));
};

const cartItemClickListener = (event) => {
  event.target.remove();
  removeProductOfStorage(event.target);
  getTotalPrice();
};

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */
const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.id = id;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const initialRendering = () => {
  if (localStorage.cartItems) {
    const productsOfStorage = JSON.parse(getSavedCartItems());
    productsOfStorage.forEach((products) => {
      cartItems.appendChild(createCartItemElement(products));
    });
  }
};

const addProductToStorage = (product) => {
  const { id, title, price } = product;
  if (localStorage.cartItems) {
    const productsOfStorage = JSON.parse(getSavedCartItems());
    productsOfStorage.push({ id, title, price });
    saveCartItems(JSON.stringify(productsOfStorage));
  } else {
    saveCartItems(JSON.stringify([{ id, title, price }]));
  }
};

const addProductToCart = async () => {
  const buttonsProduct = document.querySelectorAll('.item__add');
  buttonsProduct.forEach((button) => {
    button.addEventListener('click', async (event) => {
      const productId = event.target.parentNode.firstChild.innerText;
      const productData = await fetchItem(productId);
      cartItems.appendChild(createCartItemElement(productData));
      addProductToStorage(productData);
      getTotalPrice();
    });
  });
};

const clearCartItems = () => {
  const buttonClear = document.querySelector('.empty-cart');
  buttonClear.addEventListener('click', () => {
    cartItems.innerText = '';
    localStorage.removeItem('cartItems');
    getTotalPrice();
  });
};

window.onload = async () => {
  await appendProduct('computador');
  await addProductToCart();
  initialRendering();
  clearCartItems();
  getTotalPrice();
};
