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

  componentDidMount() {
    this.listCategories();
  }

  listCategories = async () => {
    const categorias = await getCategories();
    this.setState({
      categorias,
    });
  }

  getId = ({ target }) => {
    const { RecebeID } = this.props;
    RecebeID(target.id);
    console.log(target.id);
  }

  render() {
    const { categorias } = this.state;
    return (
      <div className="list-caregories">
        <h1>Categorias</h1>
        {categorias.map((categoria) => (
          <label key={ categoria.id } htmlFor={ categoria.id } data-testid="category">
            <input
              type="radio"
              id={ categoria.id }
              value={ categoria.name }
              name="categorias"
              onChange={ this.getId }
            />
            {categoria.name}
          </label>
        ))}
      </div>
    );
  }
}

Categorias.propTypes = {
  RecebeID: PropTypes.func.isRequired,
};

export default Categorias;
