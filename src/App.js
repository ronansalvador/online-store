import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Carrinho from './services/pages/Carrinho';
import Home from './services/pages/Home';
import Details from './services/pages/Details';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      cart: [],
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
    }));
  }

  removeItem = (id) => {
    const { cart } = this.state;
    const differentes = cart.filter((item) => item.id !== id)
    this.setState({cart: differentes})
    const iguais = cart.filter((item) => item.id === id);
    console.log(iguais.length);
    if (iguais.length > 1) {
      const test = iguais.shift();
      this.setState((prev) => ({
        cart: [...prev.cart, test]
      }));
    } /* else {
      this.setState({cart: differentes})
    } */
    
    console.log(differentes);
    console.log(iguais);
  }

  render() {
    const { cart } = this.state;
    return (
      <BrowserRouter>
        <div>
          <Switch>
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
              render={ (props) => <Carrinho { ...props } cart={ cart } addToCart={ this.addToCart} removeItem={this.removeItem} /> }
            />
            <Route
              path="/detalhes/:id"
              render={ (props) => (<Details
                { ...props }
                addToCart={ this.addToCart }
                cart={ cart }
              />) }
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
