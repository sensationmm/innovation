import React from 'react';
import PropTypes from 'prop-types';

import '../styles/css/risk-level.css';

/**
 * RiskLevel
 *
 * Site header
 */

const RiskLevel = props => {
  const warnings = [ null, 'low', 'medium', 'high' ];

  if(!props.level) {
    return null;
  }

  const warning = warnings[props.level];

  return (
    <div className={`risk-level ${warning}`}>
      { warning.slice(0, 1).toUpperCase() }
      { warning.slice(1) }
    </div>
  )
};

RiskLevel.propTypes = {
  level: PropTypes.number.isRequired
};

export default RiskLevel;
