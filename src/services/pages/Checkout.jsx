import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from '../componentes/Input';

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
    };
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
    } = this.state;
    const { cart } = this.props;
    const price = cart.map((e) => e.price);

    const TotalPrice = price.reduce((accumulator, curValue) => accumulator + curValue, 0);

    return (
      <div>
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
        <Input
          type="text"
          name="address"
          placeHolder="Endereço"
          value={ address }
          handleOnchange={ this.handleInput }
        />

      </div>

    );
  }
}
Checkout.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.object).isRequired,
};
