import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/css/buttons-and-links.css';

/**
 * ButtonCancel
 *
 * Renders a submit action button
 *
 * @param {string} label - button text
 * @param {function} onClick - action to fire when button is clicked
 */

const ButtonCancel = props => {
  const {
    label,
    onClick
  } = props;

  return (
    <button className="form-cancel-button" onClick={onClick}>
      {label}
    </button>
  );
};

ButtonCancel.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func
};

ButtonCancel.defaultProps = {
  label: 'Cancel'
};

export default ButtonCancel;
