import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';

import '../../styles/css/flex-column.css';

/**
* FlexColumn
*
* Wrapper component to display on a flex:column basis with equal height
*
* @param {element|array} children - any HTML/React components to display as the content
* @param {array} layout - array of relative width % values to pass to flex-basis. Length should match the number of children
*/

const FlexColumn = props => {
  const { style } = props;

  const elStyle = {};
  if(style && style.length) {
    elStyle[style[0]] = style[1];
  }

  return (
    <div className="flex-column" style={elStyle}>
      {!props.layout && props.children}

      {props.layout &&
        props.children.map((child, count) => {
          return cloneElement(child, { key: `child-${count}`, style: ['flexBasis', props.layout[count]]})
        })
      }
    </div>
  )
};

FlexColumn.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]).isRequired,
  layout: PropTypes.array,
  style: PropTypes.array
};

FlexColumn.defaultProps = {
  layout: null
};

export default FlexColumn;