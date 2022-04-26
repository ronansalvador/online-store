import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Home from './services/componente/Home';

class App extends Component {
  render() {
    return (
      <div>
        <Route path="/" component={ Home } />
      </div>

    );
  }
}

export default App;
