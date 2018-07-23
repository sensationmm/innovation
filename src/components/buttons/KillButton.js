import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/css/buttons-and-links.css';

/**
 * KillButton
 *
 * Renders a button to delete / kill some object
 *
 * @param {bool} disabled - control button disable / enable
 * @param {string} label - button text
 * @param {function} onClick - action to fire when button is clicked
 */

const KillButton = props => {
  const {
    label,
    onClick,
    disabled
  } = props;

  return (
    <button disabled={disabled} className={disabled ? 'kill-button disabled': 'kill-button'} onClick={onClick}>
      {label}
    </button>
  );
};

KillButton.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool
};

KillButton.defaultProps = {
  label: 'Submit'
};

export default KillButton;
