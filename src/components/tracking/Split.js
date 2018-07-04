import React from 'react';
import PropTypes from 'prop-types';

/**
* Split
*
* Tracking line for a split concept
*
* @param {integer} start - start pixel value for the line
* @param {integer} end - end pixel value for the line
* @param {integer} row - pixel value for the row in the chart (Y value)
* @param {integer} rowSplitA - pixel value for the first row in the chart to split into
* @param {integer} rowSplitB - pixel value for the second row in the chart to split into
*/

const Split = props => {
  return [
    <line key="progress" className="line" x1={props.start} y1={props.row} x2={props.end} y2={props.row} />,
    <line key="splitA" className="line merge" x1={props.end} y1={props.row} x2={props.end + 25} y2={props.rowSplitA} />,
    <line key="splitB" className="line merge" x1={props.end} y1={props.row} x2={props.end + 25} y2={props.rowSplitB} />
  ]
};

Split.propTypes = {
  start: PropTypes.number,
  end: PropTypes.number,
  row: PropTypes.number,
  rowMerge: PropTypes.number
};

export default Split;