import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/css/back-text-link.css';

/**
 * BackTextLink
 *
 * Renders a text link with a back arrow.
 *
 * @param {string} label - button text
 * @param {function} onClick - action to fire when button is clicked
 */

 const BackTextLink = (props) => (
   <div className="back-text-link">
     <i className="fas fa-chevron-left"></i>
     <span className="back-text-link-label"
       onClick={() => props.onClick()}
     >{props.label}</span>
   </div>
 );

BackTextLink.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
};

BackTextLink.defaultProps = {
  label: 'Back'
};

export default BackTextLink;
