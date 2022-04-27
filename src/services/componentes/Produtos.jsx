import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Produtos extends Component {
  render() {
    const { produtos } = this.props;
    return (
      <div>
        {produtos.map((element) => (
          <Link
            to={ `/detalhes/${element.id}` }
            data-testid="product-detail-link"
            key={ element.id }
          >
            <div
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
            </div>
          </Link>
        ))}
      </div>
    );
  }
}
Produtos.propTypes = {
  produtos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Produtos;
