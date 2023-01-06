import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Comentarios.css'

export default class Comentarios extends Component {
  render() {
    const { productId, avaliation } = this.props;
    const productComents = avaliation.filter((i) => i.productId === productId);
    // console.log(productId);
    // console.log(avaliation);
    console.log('productComents', productComents.length);
    return (
      <div className='container_comentarios'>
        {(productComents.length > 0) ? <h3>Comentarios</h3> : <h3>Produto sem avaliações.</h3>}
        <section>
          { productComents.map((e, index) => (
            <div key={ index } className='comentario_card'>
            
              <div className='comentario_avaliacao'>
              <span>Nota:</span>
              <div className="avaliacao_inputs">
                <input
                  data-testid="1-rating"
                  id="rating1"
                  type="radio"
                  checked={ e.rating1 }
                />
                <label for="rating1"></label>
              </div>
              <div className="avaliacao_inputs">
                <input
                  data-testid="2-rating"
                  id="rating2"
                  type="radio"
                  checked={ e.rating2 }
                  />
                <label for="rating2"></label>
                </div>
              <div className="avaliacao_inputs">

              <input
                data-testid="3-rating"
                id="rating3"
                type="radio"
                checked={ e.rating3 }
              />
              <label for="rating3"></label>
              </div>
              <div className="avaliacao_inputs">
              <input
                data-testid="4-rating"
                id="rating4"
                type="radio"
                checked={ e.rating4 }
              />
              <label for="rating4"></label>
              </div>
              <div className="avaliacao_inputs">


              <input
                data-testid="5-rating"
                id="rating5"
                type="radio"
                checked={ e.rating5 }
                />
              <label for="rating5"></label>
              </div>
              </div>
              <p>{`usuario: ${e.email}`}</p>
              <p>{`comentário: ${e.comentario}`}</p>
            </div>
          ))}
        </section>
      </div>
    );
  }
}
Comentarios.propTypes = {
  productId: PropTypes.string.isRequired,
  avaliation: PropTypes.arrayOf(PropTypes.object).isRequired,
};
