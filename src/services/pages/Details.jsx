import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductDetails } from '../api';
import carrinho from '../imagens/carrinho.svg';
import Avaliacao from '../componentes/Avaliacao';

class Details extends Component {
  constructor() {
    super();
    this.state = {
      detalhes: {},
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const detalhes = await getProductDetails(id);
    this.setState({ detalhes });
  }

  render() {
    const { detalhes } = this.state;
    const { addToCart, cart } = this.props;
    return (
      <div>
        <Link to="/carrinho" data-testid="shopping-cart-button">
          <img
            className="img-cart"
            src={ carrinho }
            alt="Imagem carrinho de compras"
          />
        </Link>
        <p>{ cart.length }</p>
        <div>
          <p data-testid="product-detail-name">
            { detalhes.title }
          </p>
          <img src={ detalhes.thumbnail } alt={ detalhes.title } />
          <p>
            { detalhes.price }
          </p>
          <button
            type="button"
            id={ detalhes.id }
            onClick={ ({ target }) => addToCart(target.id) }
            data-testid="product-detail-add-to-cart"
          >
            Adicionar ao carrinho
          </button>
        </div>
        <Avaliacao
          productId={ detalhes.id }
        />

      </div>
    );
  }
}

Details.propTypes = {
  match: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]),
  params: PropTypes.string,
  id: PropTypes.string,
  cart: PropTypes.arrayOf(PropTypes.object).isRequired,
  addToCart: PropTypes.func.isRequired,
};

Details.defaultProps = {
  match: '',
  params: '',
  id: '',
};

export default Details;
