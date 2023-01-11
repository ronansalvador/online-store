import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from '../componentes/Input';
// import { Link } from 'react-router-dom';

export default class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      fullname: '',
      email: '',
      cpf: '',
      phone: '',
      cep: '',
      address: '',
      cidade: '',
      estado: '',
      numero: '',
      complemento: ''
    };
  }

  getCEP = async () => {
    const { cep } = this.state;
    console.log(cep);
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    const response = await fetch(url);
    const detalhes = await response.json();
    console.log('detalhes', detalhes);
    this.setState({
      address: detalhes.logradouro,
      cidade: detalhes.localidade,
      estado: detalhes.uf,
    })
    return detalhes; 
  }

  handleInput=({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
    
  }

  render() {
    const {
      fullname,
      email,
      cpf,
      phone,
      cep,
      address,
      cidade,
      estado,
      numero,
      complemento,
    } = this.state;
    const { cart } = this.props;
    const price = cart.map((e) => e.price);

    const TotalPrice = price.reduce((accumulator, curValue) => accumulator + curValue, 0);

    return (
      <div>
          <div className="details_cart carrinho-details-cart">
          <a href='/' className='logo'><h3>Online-Store</h3></a>
          <div className='cart-page'>

          {/* <Link to="/carrinho" data-testid="shopping-cart-button">
            <img
              className="img-cart"
              src={ carrinho }
              alt="Imagem carrinho de compras"
            />
          </Link> */}
          {/* {(cart.length > 0) ? <p data-testid="shopping-cart-size" className='length'>{ cart.length }</p> : ""} */}
          </div>
        
          
        </div>
        <h3>Checkout</h3>
        {
          cart.map((e, index) => (
            <div key={ index }>
              <p>{e.title}</p>
            </div>
          ))

        }
        <span>
          {`R$: ${TotalPrice}`}
        </span>
        <Input
          type="text"
          name="fullname"
          placeHolder="Nome Completo"
          value={ fullname }
          handleOnchange={ this.handleInput }
        />
        <Input
          type="email"
          name="email"
          placeHolder="E-mail"
          value={ email }
          handleOnchange={ this.handleInput }
        />
        <Input
          type="text"
          name="cpf"
          placeHolder="CPF"
          value={ cpf }
          handleOnchange={ this.handleInput }
        />
        <Input
          type="text"
          name="phone"
          placeHolder="Telefone"
          value={ phone }
          handleOnchange={ this.handleInput }
        />
        <Input
          type="text"
          name="cep"
          placeHolder="CEP"
          value={ cep }
          handleOnchange={ this.handleInput }
        />
        <button type='button' onClick={this.getCEP}>buscar</button>
        <Input
          type="text"
          name="address"
          placeHolder="Endereço"
          value={ address }
          handleOnchange={ this.handleInput }
        />
        <Input
          type="text"
          name="cidade"
          placeHolder="Cidade"
          value={ cidade }
          handleOnchange={ this.handleInput }
        />
        <Input
          type="text"
          name="estado"
          placeHolder="UF"
          value={ estado }
          handleOnchange={ this.handleInput }
        />
        <Input
          type="number"
          name="numero"
          placeHolder="Numero"
          value={ numero }
          handleOnchange={ this.handleInput }
        />
           <Input
          type="text"
          name="complemento"
          placeHolder="Complemento"
          value={ complemento }
          handleOnchange={ this.handleInput }
        />

      </div>

    );
  }
}
Checkout.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.object).isRequired,
};
