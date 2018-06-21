import React from 'react';
import PropTypes from 'prop-types';

import '../styles/css/tooltip.css';

/*
 * Tooltip
 *
 * Renders a question tooltip that fires a text popup
 *
 * @param {string} children - content for the popup
 * @param {object} style - style overrides
 */

const Tooltip = (props) => {
  const { children, style } = props;

  return (
    <div className="tooltip-button" style={style}>
      <div className="tooltip-popup" >
        {children}
      </div>
      <i className="far fa-question-circle"></i>
    </div>
  );
};

Tooltip.propTypes = {
  children: PropTypes.string,
  style: PropTypes.object
};

export default Tooltip;
