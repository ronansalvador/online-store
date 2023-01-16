import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from '../componentes/Input';
// import { Link } from 'react-router-dom';
import './Checkout.css';
import { Link } from 'react-router-dom';
import Footer from '../componentes/Footer';

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

    const unitCart = []; // remove itens duplicados do array
    const mySet = new Set();
    console.log(cart);
    cart.forEach((item) => mySet.add(item.id));
    // console.log(teste);
    for (const item of mySet) {
      cart.find((el) => item === el.id && unitCart.push(el));
    }
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
      <div className='checkout-main'>
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
        <div className='checkout-page'>

        
        
        {
          unitCart.map((produto, index) => (
            <div key={ index } className='checkout-products' >
              <h3 data-testid="shopping-cart-product-name">{produto.title}</h3>
            <div className='checkout-product-detail'>
              
              <img
                src={ produto.thumbnail }
                alt={ `imagem do produto ${produto.title}` }
              />
               <p
                        data-testid="shopping-cart-product-quantity"
                        onChange={ () => console.log(produto.available_quantity) }
                      >
                        {/* qnt total do produto no carrinho */}
                        {`quantidade: `} 
                        { cart.filter((p) => p.id === produto.id).length }
                      </p>
                      <p>{`R$ ${produto.price * (cart.filter((p) => p.id === produto.id).length)}`}</p>
            </div>
            </div>
          ))

        }
        <div className='checkout-products' >
          <span>
            {`Total: R$: ${TotalPrice.toFixed(2)}`}
          </span>          
        </div>
        <div className='checkout-products' >
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
        <div className='checkout-cep'>
        <Input
          type="text"
          name="cep"
          placeHolder="CEP"
          value={ cep }
          handleOnchange={ this.handleInput }
        />
        <button className='checkout-btn-cep' type='button' onClick={this.getCEP}>buscar</button>

        </div>
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
      </div>
   
      <Link
                  data-testid="checkout-products"
                  to="/"
                  className='cart-checkout'
                  >
                    Finalizar Compra
                </Link>

        <Footer /> 
      </div>

    );
  }
}
Checkout.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.object).isRequired,
};
