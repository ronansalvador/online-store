import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Carrinho extends Component {
  render() {
    const { cart, addToCart, removeItem, removeAllItens } = this.props;
    const unitCart = [...new Set(cart)]; // remove itens duplicados do array
    const ONE = -1;
    unitCart.sort((a, b) => { // ordem decrescente dos produtos no carrinho
      if (a.title < b.title) {
        return 1;
      }
      if (b.title < a.title) {
        return ONE;
      }
      return 0;
    });

    return (
      <div>
        {cart.length === 0
          ? <p data-testid="shopping-cart-empty-message"> Seu carrinho está vazio </p>
          : (
            <div>
              {unitCart.map((produto) => (
                <div key={ produto.id }>
                  <div>
                    <h3 data-testid="shopping-cart-product-name">{produto.title}</h3>
                    <button
                      type="button"
                      onClick={ () => removeAllItens(produto.id) }
                    >
                      X
                    </button>
                  </div>
                  <button
                    data-testid="product-decrease-quantity"
                    type="button"
                    onClick={ () => removeItem(produto.id) }
                  >
                    -
                  </button>
                  <span
                    data-testid="shopping-cart-product-quantity"
                  >
                    {/* qnt total do produto no carrinho */}
                    { cart.filter((p) => p.id === produto.id).length }
                  </span>
                  <button
                    type="button"
                    data-testid="product-increase-quantity"
                    onClick={ () => addToCart(produto.id) }
                  >
                    {' '}
                    +
                  </button>
                </div>
              ))}
            </div>
          )}
      </div>
    );
  }
}

Carrinho.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.object).isRequired,
  addToCart: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  removeAllItens: PropTypes.func.isRequired,
};
