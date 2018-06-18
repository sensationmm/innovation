import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/css/flex-row.css';

/**
 * FlexRow
 *
 * Wrapper component to display on a flex:row basis width equal width
 *
 * @param {element|array} children - any HTML/React components to display as the content
 */

const FlexRow = props => (
  <div className="flex-row">
    {props.children}
  </div>
);

FlexRow.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]).isRequired,
};

export default FlexRow;