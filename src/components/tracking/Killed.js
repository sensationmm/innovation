import React from 'react';
import PropTypes from 'prop-types';

/**
* Killed
*
* Tracking line for a killed concept
*
* @param {integer} start - start pixel value for the line
* @param {integer} end - end pixel value for the line
* @param {integer} row - pixel value for the row in the chart (Y value)
*/

const Killed = props => {
  return [
    <line key="progress" className="line" x1={props.start} y1={props.row} x2={props.end} y2={props.row} />,
    <circle key="killmark" className="killmark" cx={props.end} cy={props.row} r="10" />,

    <line key="cross-1" className="icon" x1={props.end - 4} y1={props.row - 4} x2={props.end + 4} y2={props.row + 4} />,
    <line key="cross-2" className="icon" x1={props.end - 4} y1={props.row + 4} x2={props.end + 4} y2={props.row - 4} />
  ]
};

Killed.propTypes = {
  start: PropTypes.number,
  end: PropTypes.number,
  row: PropTypes.number
};

export default Killed;