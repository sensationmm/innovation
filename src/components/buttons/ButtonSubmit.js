import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/css/button-submit.css';

/**
 * ButtonSubmit
 *
 * Renders a submit action button
 *
 * @param {bool} disabled - control button disable / enable
 * @param {string} label - button text
 * @param {function} onClick - action to fire when button is clicked
 */

const ButtonSubmit = props => {
  const {
    label,
    onClick,
    disabled
  } = props;

  return (
    <button disabled={disabled} className="button-submit" onClick={onClick}>
      {label}
    </button>
  );
};

ButtonSubmit.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func
};

ButtonSubmit.defaultProps = {
  label: 'Submit'
};

export default ButtonSubmit;
