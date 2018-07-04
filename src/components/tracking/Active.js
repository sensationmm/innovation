import React from 'react';
import PropTypes from 'prop-types';

/**
* Active
*
* Tracking line for a still active concept
*
* @param {integer} start - start pixel value for the line
* @param {integer} end - end pixel value for the line
* @param {integer} row - pixel value for the row in the chart (Y value)
*/

const Active = props => {
  return [
    <line key="progress" className="line" x1={props.start} y1={props.row} x2={props.end} y2={props.row} />,
    <line key="arrow-upper" className="arrow" x1={props.end} y1={props.row} x2={props.end - 5} y2={props.row - 5} />,
    <line key="arrow-lower" className="arrow" x1={props.end} y1={props.row} x2={props.end - 5} y2={props.row + 5} />
  ]
};

Active.propTypes = {
  start: PropTypes.number,
  end: PropTypes.number,
  row: PropTypes.number
};

export default Active;