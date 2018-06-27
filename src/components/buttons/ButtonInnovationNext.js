import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/css/button-innovation-next.css';

/**
 * ButtonSubmit
 *
 * Renders a submit action button
 *
 * @param {bool} disabled - control button disable / enable
 * @param {string} label - button text
 * @param {function} onClick - action to fire when button is clicked
 */

const ButtonInnovationNext = props => {
  const {
    label,
    onClick,
    disabled
  } = props;

  return (
    <button disabled={disabled} className={disabled ? 'button-innovation-next disabled': 'button-innovation-next'} onClick={onClick}>
      {label}
    </button>
  );
};

ButtonInnovationNext.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func
};

ButtonInnovationNext.defaultProps = {
  label: 'Submit'
};

export default ButtonInnovationNext;
