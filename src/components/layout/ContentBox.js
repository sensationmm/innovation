import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import '../../styles/css/content-box.css';

/**
* ContentBox
*
* Wrapper component to display content in a box
*
* @param {element|array} children - any HTML/React components to display as the content
* @param {boolean} background - choose whether background shows or not
* @param {boolean} border - choose whether box has light grey top border
* @param {string} style - style overrides passed down from parent
*/

const ContentBox = props => {
  const { children, background, border, padded, style } = props;

  const elStyle = {};
  if(style && style.length) {
    elStyle[style[0]] = style[1];
  }

  return (
    <div 
      className={classnames('content-box', {'background': background}, {'bordered': border}, {'padded': padded})} 
      style={elStyle}
    >
      {children}
    </div>
  );
};

ContentBox.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
    PropTypes.string
  ]).isRequired,
  background: PropTypes.bool,
  border: PropTypes.bool,
  padded: PropTypes.bool,
  style: PropTypes.array
};

ContentBox.defaultProps = {
  background: true,
  border: false,
  padded: false
};

export default ContentBox;
