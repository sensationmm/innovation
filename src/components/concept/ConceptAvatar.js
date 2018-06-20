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
 */

const ConceptAvatar = props => {
  const {
    conceptId,
    logo,
    ident,
    color,
    size
  } = props;

  return (
    <Link to={`concept/${conceptId}`} className="concept-avatar-link">
      <div 
        className={classnames(`concept-avatar ${size}`, {logo: logo !== ''})} 
        style={{ 
          backgroundColor: !logo ? color : 'transparent',
          backgroundImage: logo !== '' ? `url(${logo})` : 'none'
        }}
      >
        {!logo && ident}
      </div> 
    </Link>
  );
};

ConceptAvatar.propTypes = {
  conceptId: PropTypes.number,
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
