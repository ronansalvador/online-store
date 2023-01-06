import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import carrinho from '../imagens/carrinho.svg';
import './Carrinho.css'

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
      <div className='container-cart'>
        <div className="details_cart">
          <Link to="/carrinho" data-testid="shopping-cart-button">
            <img
              className="img-cart"
              src={ carrinho }
              alt="Imagem carrinho de compras"
            />
          </Link>
          {(cart.length > 0) ? <p data-testid="shopping-cart-size" className='length'>{ cart.length }</p> : ""}
          
        </div>
        {cart.length === 0
          ? <p data-testid="shopping-cart-empty-message"> Seu carrinho está vazio </p>
          : (
            <div className='cart-card-product'>
              {unitCart.map((produto, index) => (
                <div key={ index } className='cart-products' >
                  <div className='cart-product-detail'>
                    <h3 data-testid="shopping-cart-product-name">{produto.title}</h3>
                    <img
                      src={ produto.thumbnail }
                      alt={ `imagem do produto ${produto.title}` }
                    />
                    <p>{`Quantidade disponibivel: ${produto.available_quantity}`}</p>
                    
                    <div className='cart-button-qnt'>
                      <button
                        data-testid="product-decrease-quantity"
                        type="button"
                        onClick={ () => removeItem(produto.id) }
                        className='cart-button-decrease'
                      >
                        -
                      </button>
                      <p
                        data-testid="shopping-cart-product-quantity"
                        onChange={ () => console.log(produto.available_quantity) }
                      >
                        {/* qnt total do produto no carrinho */}
                        { cart.filter((p) => p.id === produto.id).length }
                      </p>

                      <button
                        type="button"
                        data-testid="product-increase-quantity"
                        onClick={ () => addToCart(produto.id) }
                        className='cart-button-increase'
                        disabled={ (cart.filter((p) => p.id === produto.id).length)
                          >= produto.available_quantity }
                      >
                        +
                      </button>
                      
                    </div>
                    <button
                      type="button"
                      onClick={ () => removeAllItens(produto.id) }
                      className='cart-button-remove'
                    >
                      Remover Produto
                    </button>
                  </div>
                </div>
              ))}
                <Link
                  data-testid="checkout-products"
                  to="/checkout"
                  className='cart-checkout'
                  >
                    Finalizar Compra
                </Link>
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
