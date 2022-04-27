export async function getCategories() {
  const url = 'https://api.mercadolibre.com/sites/MLB/categories';
  const response = await fetch(url);
  const categorias = await response.json();
  return categorias;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  if (categoryId && !query) {
    const url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
    const response = await fetch(url);
    const produtos = await response.json();
    return produtos;
  }
  if (query && !categoryId) {
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
    const response = await fetch(url);
    const produtos = await response.json();
    return produtos;
  }
  if (categoryId && query) {
    const url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
    const response = await fetch(url);
    const produtos = await response.json();
    return produtos;
  }
}

export async function getProductDetails(id) {
  const url = `https://api.mercadolibre.com/items/${id}`;
  const response = await fetch(url);
  const detalhes = await response.json();
  return detalhes;
}
