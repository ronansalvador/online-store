import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Input extends Component {
  render() {
    const {
      type,
      name,
      placeHolder,
      value,
      handleOnchange,
    } = this.props;

    return (
      <div>
        <label htmlFor={ name }>
          <input
            data-testid={ `checkout-${name}` }
            type={ type }
            name={ name }
            id={ name }
            placeholder={ placeHolder }
            value={ value }
            onChange={ handleOnchange }
          />
        </label>

      </div>
    );
  }
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeHolder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleOnchange: PropTypes.func.isRequired,
};
