import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Comentarios from './Comentarios';
import './Avaliacao.css';

export default class Avaliacao extends Component {
  constructor() {
    super();
    this.state = {
      avaliation: JSON.parse(localStorage.getItem('avaliacoes')) || [],
      email: '',
      comentario: '',
      rating1: false,
      rating2: false,
      rating3: false,
      rating4: false,
      rating5: false,
    };
  }

handleInput = ({ target }) => {
  const { id, value } = target;
  this.setState({
    [id]: value,

  });
}

getRating = ({ target }) => {
  if (target.id === 'rating1') {
    this.setState({
      rating1: true,
      rating2: false,
      rating3: false,
      rating4: false,
      rating5: false,
    });
  }
  if (target.id === 'rating2') {
    this.setState({
      rating1: true,
      rating2: true,
      rating3: false,
      rating4: false,
      rating5: false,
    });
  }
  if (target.id === 'rating3') {
    this.setState({
      rating1: true,
      rating2: true,
      rating3: true,
      rating4: false,
      rating5: false,
    });
  }
  if (target.id === 'rating4') {
    this.setState({
      rating1: true,
      rating2: true,
      rating3: true,
      rating4: true,
      rating5: false,
    });
  }
  if (target.id === 'rating5') {
    this.setState({
      rating1: true,
      rating2: true,
      rating3: true,
      rating4: true,
      rating5: true,
    });
  }
}

  getAvaliation = () => {
    const
      {
        email,
        comentario,
        rating1,
        rating2,
        rating3,
        rating4,
        rating5,
      } = this.state;
    const { productId } = this.props;

    const avaliacao = {
      productId,
      email,
      comentario,
      rating1,
      rating2,
      rating3,
      rating4,
      rating5,
    };
    this.setState((prevState) => ({
      avaliation: [...prevState.avaliation, avaliacao],
    }), () => this.storage(), this.resetState());
  }

  storage = () => {
    const { avaliation } = this.state;
    localStorage.setItem('avaliacoes', JSON.stringify(avaliation));
  }

  resetState =() => {
    this.setState({
      email: '',
      comentario: '',
      rating1: false,
      rating2: false,
      rating3: false,
      rating4: false,
      rating5: false,
    });
  }

  render() {
    const
      {
        email,
        comentario,
        rating1,
        rating2,
        rating3,
        rating4,
        rating5,
        avaliation,
      } = this.state;

    const { productId } = this.props;
    return (
      <div className="avaliacao">
        <h2>Avaliações do produto</h2>
        <div className='deixe_sua_avaliacao'>
          <form>
            <h3>Deixe a sua avaliação</h3>
            <label htmlFor="email">
              <input
                placeholder="e-mail"
                id="email"
                data-testid="product-detail-email"
                type="email"
                value={ email }
                required
                onChange={ this.handleInput }
              />
            </label>
            <h3>Nota</h3>
            {/* <div className="avaliacao_inputs">
              <p>1</p>
              <p>2</p>
              <p>3</p>
              <p>4</p>
              <p>5</p>
            </div> */}
            <div className='avaliacao_notas'>
              <div className="avaliacao_inputs">
                <input
                  data-testid="1-rating"
                  id="rating1"
                  type="radio"
                  onChange={ this.getRating }
                  checked={ rating1 }
                />
                <label for="rating1">1</label>
              </div>
              <div className="avaliacao_inputs">
              <input
                data-testid="2-rating"
                id="rating2"
                type="radio"
                onChange={ this.getRating }
                checked={ rating2 }
              />
              <label for="rating2">2</label>
              </div>
              <div className="avaliacao_inputs">

              <input
                data-testid="3-rating"
                id="rating3"
                type="radio"
                onChange={ this.getRating }
                checked={ rating3 }
              />
              <label for="rating3">3</label>
              </div>
              <div className="avaliacao_inputs">
                <input
                  data-testid="4-rating"
                  id="rating4"
                  type="radio"
                  onChange={ this.getRating }
                  checked={ rating4 }
                />
                <label for="rating4">4</label>
              </div>
              <div className="avaliacao_inputs">

              <input
                data-testid="5-rating"
                id="rating5"
                type="radio"
                onChange={ this.getRating }
                checked={ rating5 }
              />
              <label for="rating5">5</label>
              </div>
            </div>
            <textarea
              data-testid="product-detail-evaluation"
              className="avaliacao_textarea"
              id="comentario"
              placeholder="Deixe seu Comentário"
              value={ comentario }
              onChange={ this.handleInput }
            />
            <button
              data-testid="submit-review-btn"
              type="button"
              className='avaliacao_button'
              onClick={ this.getAvaliation }
            >
              Avaliar
            </button>

          </form>
          <hr className='avaliacao_hr' />
          <Comentarios
            productId={ productId }
            avaliation={ avaliation }
          />
        </div>
      </div>
    );
  }
}

Avaliacao.propTypes = {
  productId: PropTypes.string,
};

Avaliacao.defaultProps = {
  productId: '',
};
