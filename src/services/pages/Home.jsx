import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import carrinho from '../imagens/carrinho.svg';
import './Home.css';

class Home extends Component {
  render() {
    return (
      <div>
        <label htmlFor="InputBusca">
          <input
            id="InputBusca"
            type="text"
          />
        </label>
        <Link to="/carrinho" data-testid="shopping-cart-button">
          <img
            className="img-cart"
            src={ carrinho }
            alt="Imagem carrinho de compras"
          />
        </Link>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      </div>
    );
  }
}

export default Home;
