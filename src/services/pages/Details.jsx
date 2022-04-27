import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductDetails } from '../api';
// Comentario

class Details extends Component {
  constructor() {
    super();
    this.state = {
      detalhes: {},
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const detalhes = await getProductDetails(id);
    console.log(detalhes);
    this.setState({ detalhes });
  }

  render() {
    const { detalhes } = this.state;
    return (
      <div>
        <div>
          <p data-testid="product-detail-name">
            { detalhes.title }
          </p>
          <img src={ detalhes.thumbnail } alt={ detalhes.title } />
          <p>
            { detalhes.price }
          </p>
        </div>
      </div>
    );
  }
}

Details.propTypes = {
  match: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]),
  params: PropTypes.string,
  id: PropTypes.string,
};

Details.defaultProps = {
  match: '',
  params: '',
  id: '',
};

export default Details;
