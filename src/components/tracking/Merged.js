import React from 'react';
import PropTypes from 'prop-types';

/**
* Merged
*
* Tracking line for a merged concept
*
* @param {integer} start - start pixel value for the line
* @param {integer} end - end pixel value for the line
* @param {integer} row - pixel value for the row in the chart (Y value)
* @param {integer} rowMerge - pixel value for the row in the chart to merge into
*/

const Merged = props => {
  return [
    <line key="progress" className="line" x1={props.start} y1={props.row} x2={props.end} y2={props.row} />,
    <line key="merge" className="line merge" x1={props.end} y1={props.row} x2={props.end + 25} y2={props.rowMerge} />
  ]
};

Merged.propTypes = {
  start: PropTypes.number,
  end: PropTypes.number,
  row: PropTypes.number,
  rowMerge: PropTypes.number
};

export default Merged;