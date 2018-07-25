import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/css/buttons-and-links.css';

/**
 * BackTextLink
 *
 * Renders a text link with a back arrow.
 *
 * @param {string} label - button text
 * @param {function} onClick - action to fire when button is clicked
 * @param {string} textColor - color of the text as a string
 */

 const BackTextLink = (props) => (
   <div className="back-text-link">
     <i className="fas fa-chevron-left" style={{ color: props.textColor ? props.textColor : 'inherit' }}></i>
     <span
       className="back-text-link-label"
       onClick={() => props.onClick()}
       style={{ color: props.textColor ? props.textColor : 'inherit' }}
     >{props.label}</span>
   </div>
 );

BackTextLink.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  textColor: PropTypes.string
};

BackTextLink.defaultProps = {
  label: 'Back'
};

export default BackTextLink;
