import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import '../../styles/css/concept-avatar.css';

/**
 * ConceptAvatar
 *
 * Renders circular avatar icon for a concept
 *
 * @param {string} logo - short text string to display in the avatar
 * @param {string} ident - short text string to display in the avatar
 * @param {string} color - background color for the avatar
 * @param {string} size [small, large] - render size of the avatar
 */

const ConceptAvatar = props => {
  const {
    logo,
    ident,
    color,
    size
  } = props;

  return (
    <div 
      className={classnames(`concept-avatar ${size}`, {logo: logo !== ''})} 
      style={{ 
        backgroundColor: !logo ? color : 'transparent',
        backgroundImage: logo !== '' ? `url(${logo})` : 'none'
      }}
    >
      {!logo && ident}
    </div> 
  );
};

ConceptAvatar.propTypes = {
  logo: PropTypes.string,
  ident: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.oneOf(['small','large'])
};

ConceptAvatar.defaultProps = {
  logo: '',
  size: 'small'
};

export default ConceptAvatar;
