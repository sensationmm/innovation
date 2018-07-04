import React from 'react';
import PropTypes from 'prop-types';

import Killed from './Killed';

/**
* Pivoted
*
* Tracking line for a split concept
*
* @param {integer} start - start pixel value for the line
* @param {integer} end - end pixel value for the line
* @param {integer} row - pixel value for the row in the chart (Y value)
* @param {integer} rowSplitA - pixel value for the first row in the chart to split into
* @param {integer} rowSplitB - pixel value for the second row in the chart to split into
*/

const Pivoted = props => {
  return [
    <line key="merge" className="line merge" x1={props.end} y1={props.row} x2={props.end} y2={props.rowPivot} />,
    <Killed key="progress" start={props.start} end={props.end} row={props.row} />
  ]
};

Pivoted.propTypes = {
  start: PropTypes.number,
  end: PropTypes.number,
  row: PropTypes.number,
  rowPivot: PropTypes.number
};

export default Pivoted;