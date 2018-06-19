import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/css/concept-logo.css';

/**
 * Concept Logo
 *
 * Renders logo
 *
 * @param {string} logo - uploaded logo url
 */

const ConceptLogo = props => {
  const { logo, name } = props;

  return (
    <div className="concept-logo">
      <img src={logo} alt={`${name} logo`} title={`${name} logo`} />
    </div>
  );
};

ConceptLogo.propTypes = {
  logo: PropTypes.string,
  name: PropTypes.string
};

export default ConceptLogo;
