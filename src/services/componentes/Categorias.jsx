import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../api';
import './Categorias.css';

class Categorias extends Component {
  constructor() {
    super();
    this.state = {
      categorias: [],
    };
  }

  componentDidMount() { // ao iniciar a pagina executa a função listCategories
    this.listCategories();
  }

  listCategories = async () => { // executa a função getCategories e armazena as categorias no estado.
    const categorias = await getCategories();
    this.setState({
      categorias,
    });
  }

  getId = ({ target }) => {
    const { RecebeID } = this.props; // função recebida como props do component home RecebeID == getCategoryId
    RecebeID(target.id); // captura o ID e executa a função RecebiID
  }

  render() {
    const { categorias } = this.state;
    return (
      <div className="list-categories">
        <h1>Categorias</h1>
        {categorias.map((categoria) => (
          <div key={ categoria.id } className="categories">
            <input
              type="radio"
              id={ categoria.id }
              value={ categoria.name }
              name="categorias"
              onChange={ this.getId }
            />
            <label htmlFor={ categoria.id } data-testid="category">
              {categoria.name}
            </label>
          </div>
        ))}
      </div>
    );
  }
}

Categorias.propTypes = {
  RecebeID: PropTypes.func.isRequired,
};

export default Categorias;
