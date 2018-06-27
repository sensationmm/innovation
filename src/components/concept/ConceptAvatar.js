import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import '../../styles/css/concept-avatar.css';

/**
 * ConceptAvatar
 *
 * Renders circular avatar icon for a concept & link to concept one pager
 *
 * @param {string} logo - short text string to display in the avatar
 * @param {string} ident - short text string to display in the avatar
 * @param {string} color - background color for the avatar
 * @param {string} size [small, large] - render size of the avatar
 * @param {boolean} showLink - whether to link the avatar to the concept one pager
 * @param {boolean} filteredOut - reduced opacity for filters
 */

const ConceptAvatar = props => {
  const {
    conceptId,
    logo,
    ident,
    color,
    size,
    filteredOut,
    showLink
  } = props;

  const avatar = (
    <div 
      className={classnames(
        `concept-avatar ${size}`, 
        { logo: logo !== '' },
        { filtered: filteredOut }
      )} 
      style={{ 
        backgroundColor: !logo ? color : 'transparent',
        backgroundImage: logo !== '' ? `url(${logo})` : 'none'
      }}
    >
      {!logo && ident}
    </div> 
  );

  if(!showLink) {
    return avatar;
  }

  return (
    <Link to={`concept/${conceptId}`} className="concept-avatar-link" >
      {avatar}
    </Link>
  );
};

ConceptAvatar.propTypes = {
  conceptId: PropTypes.number.isRequired,
  logo: PropTypes.string,
  ident: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.oneOf(['small','large']),
  filteredOut: PropTypes.bool,
  showLink: PropTypes.bool
};

ConceptAvatar.defaultProps = {
  logo: '',
  size: 'small',
  filteredOut: false,
  showLink: true
};

export default ConceptAvatar;
