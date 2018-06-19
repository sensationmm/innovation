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
* @param {string} style - style overrides passed down from parent
*/

const ContentBox = props => {
  const { children, background, style } = props;

  const elStyle = {};
  if(style && style.length) {
    elStyle[style[0]] = style[1];
  }

  return (
    <div 
      className={classnames('content-box', {'background': background})} 
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
  style: PropTypes.array
};

ContentBox.defaultProps = {
  background: true
};

export default ContentBox;
