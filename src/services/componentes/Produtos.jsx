import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Produtos.css';

class Produtos extends Component {
  render() {
    const { produtos, addToCart } = this.props;
    return (
      <div className="mainProducts">
        {produtos.map((element) => (

          <div
            key={ element.id }
            data-testid="product"
            className="cardProduct"
          >
            <div className="productTitle">
              <h3>
                {element.title}
              </h3>
            </div>
            <div className="freeShipping">
              {element.shipping.free_shipping
              && <p data-testid="free-shipping">Frete Gratis</p>}
            </div>
            <img
              src={ element.thumbnail }
              alt={ `imagem do produto ${element.title}` }
            />
            <span>
              {`R$ ${element.price}`}
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
