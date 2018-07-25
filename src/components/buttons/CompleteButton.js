import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/css/buttons-and-links.css';

/**
 * CompleteButton
 *
 * Renders a button to complete some action
 *
 * @param {bool} disabled - control button disable / enable
 * @param {string} label - button text
 * @param {function} onClick - action to fire when button is clicked
 */

const CompleteButton = props => {
  const {
    label,
    onClick,
    disabled
  } = props;

  return (
    <button disabled={disabled} className={disabled ? 'complete-button disabled': 'complete-button'} onClick={onClick}>
      {label}
    </button>
  );
};

CompleteButton.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool
};

CompleteButton.defaultProps = {
  label: 'Submit'
};

export default CompleteButton;
