import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Carrinho from './services/pages/Carrinho';
import Home from './services/pages/Home';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/" component={ Home } />
            <Route path="/carrinho" component={ Carrinho } />
            <Route path="/detalhes/:id" component={ Details } />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
