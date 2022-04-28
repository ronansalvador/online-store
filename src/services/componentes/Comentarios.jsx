import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Comentarios extends Component {
  render() {
    const { productId, avaliation } = this.props;
    const productComents = avaliation.filter((i) => i.productId === productId);
    console.log(productId);
    console.log(avaliation);
    console.log(productComents);
    return (
      <div>
        Comentarios
        <section>
          { productComents.map((e, index) => (
            <div key={ index }>
              <p>{e.email}</p>
              <p>{e.comentario}</p>
              <input
                data-testid="1-rating"
                id="rating1"
                type="radio"
                checked={ e.rating1 }
              />

              <input
                data-testid="2-rating"
                id="rating2"
                type="radio"
                checked={ e.rating2 }
              />

              <input
                data-testid="3-rating"
                id="rating3"
                type="radio"
                checked={ e.rating3 }
              />

              <input
                data-testid="4-rating"
                id="rating4"
                type="radio"
                checked={ e.rating4 }
              />

              <input
                data-testid="5-rating"
                id="rating5"
                type="radio"
                checked={ e.rating5 }
              />
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
