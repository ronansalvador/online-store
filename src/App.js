import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Carrinho from './services/pages/Carrinho';
import Home from './services/pages/Home';
import Details from './services/pages/Details';
import './App.css';
import Checkout from './services/pages/Checkout';

class App extends Component {
  constructor() {
    super();
    this.state = {
      cart: JSON.parse(localStorage.getItem('carrinho')) || [],
      produtos: [],
    };
  }

  setProducts = (produtos) => {
    this.setState({
      produtos,
    });
  }

  addToCart = (id) => {
    const { produtos } = this.state;
    const addproduct = produtos.find((produto) => produto.id === id);
    this.setState((prevState) => ({
      cart: [...prevState.cart, addproduct],
    }), () => this.setLocalStorage());
    // console.log(this.state.cart);
  }

  setLocalStorage = () => {
    const { cart } = this.state;
    localStorage.setItem('carrinho', JSON.stringify(cart));
  }

  /* removeItem = (id) => {
    const { cart } = this.state;
    const differentes = cart.filter((item) => item.id !== id);
    this.setState({ cart: differentes });
  } */

  removeAllItens = (id) => { // função que remove do carrinho todos os itens do produto ao clicar no "X"
    const { cart } = this.state;
    const differentes = cart.filter((item) => item.id !== id);
    this.setState({
      cart: differentes,
    }, () => this.setLocalStorage());
  }

  removeItem = (id) => { // função que remove do carrinho 1 qtd do produto ao clicar no "-"
    const { cart } = this.state;
    const differentes = cart.filter((item) => item.id !== id);
    this.setState({
      cart: differentes,
    });
    const itemCart = cart.filter((item) => item.id === id);
    itemCart.splice(0, 1); // splice(0, 1) -> remove 1 elemento do array a partir do indice 0
    this.setState((prevState) => ({
      cart: [...prevState.cart, ...itemCart], // spread do estado anterios + spread do array após o splice
    }), () => this.setLocalStorage());
  }

  render() {
    const { cart } = this.state;
    return (
      <BrowserRouter>
        <div>
          
            <Route
              exact
              path="/"
              render={ (props) => (<Home
                { ...props }
                addToCart={ this.addToCart }
                setProducts={ this.setProducts }
                cart={ cart }
              />) }
            />
            <Route
              path="/carrinho"
              render={ (props) => (<Carrinho
                { ...props }
                cart={ cart }
                addToCart={ this.addToCart }
                removeItem={ this.removeItem }
                removeAllItens={ this.removeAllItens }
              />) }
            />
            <Route
              path="/detalhes/:id"
              render={ (props) => (<Details
                { ...props }
                addToCart={ this.addToCart }
                cart={ cart }
              />) }
            />
            <Route
              path="/checkout"
              render={ (props) => (<Checkout
                { ...props }
                cart={ cart }
              />) }
            />
          
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
