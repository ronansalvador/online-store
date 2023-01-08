import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductDetails } from '../api';
import carrinho from '../imagens/carrinho.svg';
import Avaliacao from '../componentes/Avaliacao';
import './Details.css';
import Footer from '../componentes/Footer';

class Details extends Component {
  constructor() {
    super();
    this.state = {
      detalhes: {},
      atributos: []
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const detalhes = await getProductDetails(id);
    const atributos = detalhes.attributes;

    /*  const { shipping } = detalhes;
    console.log(shipping);
    if (shipping.free_shipping) {
      console.log(shipping.free_shipping);
    } */
    this.setState({ detalhes, atributos });
  }

  render() {
    const { detalhes, atributos } = this.state;
    console.log('detalhes', detalhes);
    const { addToCart, cart } = this.props;
    return (
      <div className="details_container">
      <div className="details_cart carrinho-details-cart">
          <a href='/' className='logo'><h3>Online-Store</h3></a>
          <div className='cart-page'>

          <Link to="/carrinho" data-testid="shopping-cart-button">
            <img
              className="img-cart"
              src={ carrinho }
              alt="Imagem carrinho de compras"
            />
          </Link>
          {(cart.length > 0) ? <p data-testid="shopping-cart-size" className='length'>{ cart.length }</p> : ""}
          </div>
        
          
        </div>
        <div className="details_products">
          <h2 data-testid="product-detail-name">
            { detalhes.title }
          </h2>
          {/* {shipping.free_shipping ?
            <p data-testid="free-shipping">Frete Gratis</p> : ''} */}
          <div className='details-product-description'>
            <div className='details-product-value'>
              <img src={ detalhes.thumbnail } alt={ detalhes.title } />
              <p>
                {`Valor do produto R$: ${detalhes.price}` }
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
          <div className="details_description">
            {atributos.map((atribut, index) => (
              <div key={ index }>
                <span>{`- ${atribut.name}: ${atribut.value_name}`}</span>
              </div>
            ))}
          </div>
            </div>
        </div>
        <Avaliacao
          productId={ detalhes.id }
        />
      <Footer />
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
