import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Carrinho extends Component {
  render() {
    const { cart } = this.props;
    const unitCart = [...new Set(cart)];
    return (
      <div>
        {cart.length === 0
          ? <p data-testid="shopping-cart-empty-message"> Seu carrinho está vazio </p>
          : (
            <div>
              {unitCart.map((produto) => (
                <div key={ produto.id }>
                  <h3 data-testid="shopping-cart-product-name">{produto.title}</h3>
                  <span
                    data-testid="shopping-cart-product-quantity"
                  >
                    { cart.filter((p) => p.id === produto.id).length }
                  </span>
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
};
