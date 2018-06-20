import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/css/page-actions.css';

/**
* PageActions
*
* Renders a set of components centrally
*
* @param {element|array} children - any HTML/React components to display as the content
*/

const PageActions = props => {
  return (
    <div className="page-actions">
      {props.children}
    </div>
  )
};

PageActions.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]).isRequired
};

export default PageActions;
