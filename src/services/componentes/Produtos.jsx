import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Produtos extends Component {
  render() {
    const { produtos, addToCart } = this.props;
    return (
      <div>
        {produtos.map((element) => (

          <div
            key={ element.id }
            data-testid="product"
          >
            <h3>
              {element.title}
            </h3>
            <img
              src={ element.thumbnail }
              alt={ `imagem do produto ${element.title}` }
            />
            <span>
              {element.price}
            </span>
            <Link
              to={ `/detalhes/${element.id}` }
              data-testid="product-detail-link"
            >
              Mais detalhes
            </Link>
            <button
              type="button"
              id={ element.id }
              onClick={ ({ target }) => addToCart(target.id) }
              data-testid="product-add-to-cart"
            >
              Adicionar ao carrinho
            </button>
          </div>

        ))}
      </div>
    );
  }
}
Produtos.propTypes = {
  produtos: PropTypes.arrayOf(PropTypes.object).isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default Produtos;
