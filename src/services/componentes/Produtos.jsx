import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Produtos extends Component {
  render() {
    const { produtos } = this.props;
    return (
      <div>
        {produtos.map((element) => (
          <div
            data-testid="product"
            key={ element.id }
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
        ))}
      </div>
    );
  }
}
Produtos.propTypes = {
  produtos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Produtos;
