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
*/

const ContentBox = props => {
  const { children, background } = props;

  return (
    <div className={classnames('content-box', {'background': background})}>
    {children}
    </div>
  );
};

ContentBox.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]).isRequired,
  background: PropTypes.bool
};

ContentBox.defaultProps = {
  background: true
};

export default ContentBox;
