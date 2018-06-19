import React from 'react';
import PropTypes from 'prop-types';

import '../styles/css/progress-dot.css';

/**
 * ProgressDot
 *
 * Renders a percentage progress as a part-filled cirle
 *
 * @param {float} progress - the progress score as a decimal
 * @param {string} color [pink,green,yellow,blue] - color of the circle
 */

const ProgressDot = props => {
  const {
    progress,
    color
  } = props;

  return (
    <div className={`progress-dot ${color}`}>
      <div className="progress-dot-inner" style={{ transform: `scale(${progress})` }} />
    </div> 
  );
};

ProgressDot.propTypes = {
  progress: PropTypes.number,
  color: PropTypes.oneOf(['pink','green','yellow','blue'])
};

export default ProgressDot;
