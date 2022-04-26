import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Carrinho from './services/pages/Carrinho';
import Home from './services/pages/Home';
import './App.css';
import { Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/" component={ Home } />
            <Route path="/carrinho" component={ Carrinho } />
          </Switch>
          
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
